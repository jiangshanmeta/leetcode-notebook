<template>
    <main>
        <h1>{{ tagInfo.name }}</h1>

        <h2>相关问题</h2>
        <Questions :question-list="questionList" />

        <h2>相关Topic</h2>
        <Topics :topics="topicList" />
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
                    console.log(docs);
                    this.topicList = docs;
                });
            },
            immediate: true,
        },
    },
};
</script>
