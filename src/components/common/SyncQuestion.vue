<template>
    <el-button
        @click="doSyncQuestion"
    >
        同步题目
    </el-button>
</template>

<script>
import {
    QuestionDB,
} from '@/db';

const https = require('https');

export default {
    methods: {
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
                data.link = '';
                return data;
            }).filter((item) => {
                return !this.$store.getters.questionMap[item._id];
            }).sort((a, b) => a._id - b._id);

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
