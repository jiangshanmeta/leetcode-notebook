<template>
    <main>
        <h1>{{ topicInfo.name }}</h1>
        <h2>相关问题</h2>
        <Questions
            :question-list="questionList"
            @refresh="getRelateQuestion"
        />

        <h2>相关Tag</h2>
        <Tags :tags="tagList" />
    </main>
</template>

<script>
import Questions from '@/components/common/Questions';
import Tags from '@/components/common/Tags';

import {
    QuestionDB,
} from '@/db';

export default {
    components: {
        Questions,
        Tags,
    },
    props: {
        topic: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            questionList: [],
        };
    },
    computed: {
        topicInfo () {
            return this.$store.getters.topicMap[this.topic];
        },
        tagList () {
            return this.topicInfo.tags.map((tagId) => this.$store.getters.tagMap[tagId]);
        },
    },
    watch: {
        topic: {
            handler () {
                this.getRelateQuestion();
            },
            immediate: true,
        },
    },
    methods: {
        getRelateQuestion () {
            QuestionDB.find({
                topics: {
                    $elemMatch: this.topic,
                },
            }, (err, docs) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: 'topicDetail get question err',
                    });
                }
                this.questionList = docs;
            });
        },
    },
};
</script>
