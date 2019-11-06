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
            this.$message({
                type: 'success',
                message: '正在获取题目列表',
            });
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
            }).then((json) => {
                this.$message({
                    type: 'success',
                    message: '获取问题列表成功，正在写入本地',
                });
                this.updateDb(json);
            });
        },
        updateDb (json) {
            const list = json.stat_status_pairs.map((item) => {
                const data = {};
                const stat = item.stat;
                data._id = stat.frontend_question_id;
                data.title = stat.question__title;
                data.title_slug = stat.question__title_slug;
                data.difficulty = item.difficulty.level;
                return data;
            });

            QuestionDB.insert(list, (err, questionList) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: '问题列表写入本地失败',
                    });
                }

                this.$store.commit('setQuestionList', questionList);

                this.$message({
                    type: 'success',
                    message: '同步题目成功',
                });
            });
        },
    },
};
</script>
