<template>
    <main>
        <h1>{{ tagInfo.name }}</h1>

        <h2>相关问题</h2>
        <Questions
            :question-list="questionList"
            @refresh="getRelateQuestion"
        />

        <h2>相关Topic</h2>
        <Topics
            :topics="topicList"
            @refresh="getRelateTopic"
        />
    </main>
</template>

<script>
import Questions from '@/components/common/Questions';
import Topics from '@/components/common/Topics';

import {
    QuestionDB,
    TopicDB,
} from '@/db';

export default {
    components: {
        Questions,
        Topics,
    },
    props: {
        tag: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            questionList: [],
            topicList: [],
        };
    },
    computed: {
        tagInfo () {
            return this.$store.getters.tagMap[this.tag];
        },
    },
    watch: {
        tag: {
            handler () {
                this.getRelateQuestion();
                this.getRelateTopic();
            },
            immediate: true,
        },
    },
    methods: {
        getRelateQuestion () {
            QuestionDB.find({
                tags: {
                    $elemMatch: this.tag,
                },
            }, (err, docs) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: 'tagDetail get question err',
                    });
                }
                this.questionList = docs;
            });
        },
        getRelateTopic () {
            TopicDB.find({
                tags: {
                    $elemMatch: this.tag,
                },
            }, (err, docs) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: 'tagDetail get topics err',
                    });
                }
                this.topicList = docs;
            });
        },
    },
};
</script>
