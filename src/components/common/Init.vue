<template>
    <el-button
        v-if="process.env.NODE_ENV === 'development'"
        type="danger"
        @click="init"
    >
        初始化
    </el-button>
</template>

<script>
import {
    QuestionDB,
    TopicDB,
    TagDB,
} from '@/db';

export default{
    config: {
        process: process,
    },
    methods: {
        init () {
            QuestionDB.remove({}, {
                multi: true,
            });
            this.$store.state.questionList = [];
            TopicDB.remove({}, {
                multi: true,
            });
            this.$store.state.topicList = [];
            TagDB.remove({}, {
                multi: true,
            });
            this.$store.state.tagList = [];
        },
    },
}
</script>