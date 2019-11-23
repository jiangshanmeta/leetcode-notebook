<template>
    <div>
        <el-form
            :inline="true"
            @submit.native.prevent
        >
            <el-form-item>
                <el-input v-model="search" />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleClick"
                >
                    查询
                </el-button>
            </el-form-item>
        </el-form>
        <table class="table">
            <thead>
                <tr>
                    <th>题号</th>
                    <th>标题</th>
                    <th>难度</th>
                    <th>themes</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="question in questionList"
                    :key="question._id"
                >
                    <td>{{ question._id }}</td>
                    <td>{{ question.title }}</td>
                    <td>
                        <ViewDifficulty
                            :difficulty="question.difficulty"
                        />
                    </td>
                    <td>
                        <ViewTheme
                            v-if="question.themes"
                            :themes="question.themes"
                            @showTheme="showTheme"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <ThemeDetail
            v-if="detailInfo"
            :visible.sync="detailDialogVisible"
            :theme-info="detailInfo"
        />

        <el-pagination
            style="text-align:center;"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import ViewDifficulty from '@/components/questions/ViewDifficulty';
import ViewTheme from '@/components/questions/ViewTheme';
import ThemeDetail from '@/components/themes/ThemeDetail';

import {
    getQuestionList,
} from '@/server/question';

import {
    getThemeByQuestionIds,
} from '@/server/theme';

export default {
    name:'Questions',
    components:{
        ViewDifficulty,
        ViewTheme,
        ThemeDetail,
    },
    data(){
        return {
            search:'',
            currentPage:1,
            total:0,
            pageSize:50,
            questionList:[],
            detailInfo:null,
            detailDialogVisible:false,
        };
    },
    watch:{
        "$store.state.serverQuestionVersion":"getQuestionList",
    },
    created(){
        this.getQuestionList();
    },
    methods:{
        handleClick(){
            this.currentPage = 1;
            this.getQuestionList();
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage;
            this.getQuestionList();
        },
        async getQuestionList(){

            const data = {
                page:this.currentPage,
                search:this.search,
                pageSize:this.pageSize,
            };
            const {
                total,
                questionList,
            } = await getQuestionList(data);

            const questionIds = questionList.map(question=>question._id);

            const {
                themeList,
            } = await getThemeByQuestionIds(questionIds);

            const themeGroupByQuestion = themeList.reduce((obj,theme)=>{
                theme.questions.forEach((questionId)=>{
                    (obj[questionId] || (obj[questionId]=[]) ).push(theme);
                });
                return obj;
            },{});

            questionList.forEach((question)=>{
                if(themeGroupByQuestion[question._id]){
                    question.themes = themeGroupByQuestion[question._id];
                }
            });

            this.total = total;
            this.questionList = questionList;

        },
        showTheme(theme){
            this.detailInfo = theme;
            this.detailDialogVisible = true;
        },
    },
};
</script>