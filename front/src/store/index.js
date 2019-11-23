import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        questionList:[],
        serverQuestionVersion:0,
    },
    getters:{
        questionMap(state){
            return state.questionList.reduce((obj,question)=>{
                obj[question._id] = question;
                return obj;
            },{});
        },
    },
    mutations: {
        updateServerQuestionVersion(state){
            state.serverQuestionVersion += 1;
        },
    },
    actions: {
        addQuestion({
            state,getters,
        },questionList){
            const copyQuestions = [
                ...state.questionList,
            ];
            questionList = questionList.filter((question)=>{
                return !getters.questionMap[question._id];
            });
            copyQuestions.push(...questionList);
            state.questionList = copyQuestions;
        },
    },
    modules: {},
});
