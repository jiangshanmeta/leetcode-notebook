<template>
    <el-dialog
        title="theme详情"
        fullscreen
        :visible="visible"
        @update:visible="updateVisible"
    >
        <template v-slot:default>
            <h2>{{ name }}</h2>
            <ul class="list-group">
                <li
                    v-for="questionId in canShowQuestions"
                    :key="questionId"
                    class="list-group-item"
                >
                    {{ $store.getters.questionMap[questionId].title }}
                    ( {{ $store.getters.questionMap[questionId]._id }} )
                </li>
            </ul>
            <div
                v-html="articleHTML"
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
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';

const md = new MarkdownIt({
    highlight: function (str, lang) {
        return `<pre class="language-${lang}">${Prism.highlight(str, Prism.languages[lang], lang)}</pre>`;
    },
});

export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        name:{
            type:String,
            required:true,
        },
        questions:{
            type:Array,
            required:true,
        },
        article:{
            type:String,
            required:true,
        },
    },
    data(){
        return {
            mdHTML:'',
        };
    },
    computed:{
        canShowQuestions(){
            return this.questions.filter((questionId)=>{
                return this.$store.getters.questionMap[questionId];
            });
        },
        articleHTML(){
            return md.render(this.article);
        },
    },
    watch:{
        questions:{
            handler(){
                this.$store.dispatch('getQuestionByIds',this.questions);
            },
            immediate:true,
        },
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
