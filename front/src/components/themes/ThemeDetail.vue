<template>
    <el-dialog
        title="theme详情"
        fullscreen
        :visible="visible"
        @update:visible="updateVisible"
    >
        <template v-slot:default>
            <h2>{{ themeInfo.name }}</h2>
            <ul class="list-group">
                <li
                    v-for="questionId in themeInfo.questions"
                    :key="questionId"
                    class="list-group-item"
                >
                    <div
                        v-if="$store.getters.questionMap[questionId]"
                    >
                        {{ $store.getters.questionMap[questionId].title }}
                        ( {{ $store.getters.questionMap[questionId]._id }} )
                    </div>
                </li>
            </ul>
            <div
                v-html="mdHTML"
            />
        </template>
        <template v-slot:footer>
            <el-button @click="closeDialog">
                关闭
            </el-button>
        </template>
    </el-dialog>
</template>

<script>
import {
    getQuestionByIds,
} from '@/server/question';

import MarkdownIt from 'markdown-it';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        themeInfo: {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            mdHTML:'',
        };
    },
    watch:{
        themeInfo:{
            handler(){
                const noCacheQuestionIds = this.themeInfo.questions.filter((questionId)=>{
                    return !this.$store.getters.questionMap[questionId];
                });

                if(noCacheQuestionIds.length>0){
                    getQuestionByIds(noCacheQuestionIds).then((json)=>{
                        this.$store.dispatch('addQuestion',json.questionList);
                    });
                }

                this.mdHTML = this.md.render(this.themeInfo.article);
            },
            immediate:true,
        },
    },
    beforeCreate(){
        this.md = new MarkdownIt({
            highlight: function (str, lang) {
                return `<pre class="language-${lang}">${Prism.highlight(str, Prism.languages[lang], lang)}</pre>`;
            },
        });
    },
    methods: {
        updateVisible (visible) {
            this.$emit('update:visible', visible);
        },
        closeDialog () {
            this.updateVisible(false);
        },
    },
};
</script>
