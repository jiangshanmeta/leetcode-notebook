import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
    getQuestionByIds,
} from '@/server/question';

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
            questionList.forEach((question)=>{
                if(!getters.questionMap[question._id]){
                    state.questionList.push(question);
                }
            });
        },
        getQuestionByIds({
            getters,dispatch,
        },questionIds){
            const noCacheQuestionIds = questionIds.filter((questionId)=>{
                return !getters.questionMap[questionId];
            });

            if(noCacheQuestionIds.length === 0){
                return ;
            }

            getQuestionByIds(noCacheQuestionIds).then(({
                questionList,
            })=>{
                dispatch('addQuestion',questionList);
            });
        },
    },
});
