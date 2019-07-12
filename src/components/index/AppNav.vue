<template>
    <el-menu
        mode="horizontal"
        :router="true"
        class="app-menu"
    >
        <el-menu-item index="/">
            问题列表
        </el-menu-item>
        <el-menu-item index="/TopicList">
            专题列表
        </el-menu-item>
        <el-menu-item index="/TagList">
            标签列表
        </el-menu-item>

        <el-button
            type="danger"
            class="app-nav-btn"
            @click="init"
        >
            初始化
        </el-button>

        <el-button
            type="primary"
            class="app-nav-btn"
            @click="doSyncQuestion"
        >
            同步题目
        </el-button>
    </el-menu>
</template>

<script>
import {
    QuestionDB,
} from '@/db';
const https = require('https');

export default {
    name: 'AppNav',
    methods: {
        init () {
            QuestionDB.remove({}, {
                multi: true,
            });
            this.$store.state.questionList = [];
        },

        doSyncQuestion () {
            new Promise((resolve) => {
                https.get('https://leetcode.com/api/problems/all/', (res) => {
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => {
                        rawData += chunk;
                    });
                    res.on('end', () => {
                        try {
                            const parsedData = JSON.parse(rawData);
                            resolve(parsedData);
                        } catch (e) {
                            console.error(e.message);
                        }
                    });
                }).on('error', (e) => {
                    console.error(`出现错误: ${e.message}`);
                });
            }).then(this.updateDb);
        },
        updateDb (json) {
            const list = json.stat_status_pairs.map((item) => {
                const data = {};
                const stat = item.stat;
                data._id = stat.frontend_question_id;
                data.title = stat.question__title;
                data.title_slug = stat.question__title_slug;
                data.difficulty = item.difficulty.level;
                data.status = 0;
                data.tags = [];
                data.topics = [];
                return data;
            }).filter((item) => {
                return !this.$store.getters.questionMap[item._id];
            }).sort((a, b) => { +a._id - b._id; });

            if (list.length) {
                QuestionDB.insert(list, (err, newDocs) => {
                    if (err) {
                        return this.$message({
                            type: 'warning',
                            message: '同步题目失败',
                        });
                    }

                    this.$store.state.questionList = [
                        ...this.$store.state.questionList,
                        ...newDocs,
                    ];

                    this.$message({
                        type: 'success',
                        message: '同步题目成功',
                    });
                });
            } else {
                this.$message({
                    type: 'success',
                    message: '暂无新题目',
                });
            }
        },
    },
};
</script>

<style scoped>
.app-nav-btn{
    float:right;
    margin-top:10px;
    margin-right:15px;
}
</style>
