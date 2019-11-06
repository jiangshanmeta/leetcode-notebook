import Vue from 'vue';
import Vuex from 'vuex';

import {
    QuestionDB,
    ThemeDB,
} from '@/db';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        questionList: [],
        themeList: [],
    },
    getters: {
        questionMap (state) {
            return state.questionList.reduce((obj, item) => {
                obj[item._id] = item;
                return obj;
            }, {});
        },
        themeMap (state) {
            return state.themeList.reduce((obj, item) => {
                obj[item._id] = item;
                return item;
            }, {});
        },
        questionThemeMap (state) {
            return state.themeList.reduce((obj, theme) => {
                const questions = theme.questions;
                questions.forEach((questionId) => {
                    (obj[questionId] || (obj[questionId] = [])).push(theme);
                });
                return obj;
            }, {});
        },
    },
    mutations: {
        setQuestionList (state, questionList) {
            state.questionList = questionList;
        },
        setThemeList (state, themeList) {
            state.themeList = themeList;
        },
    },
    actions: {
        getQuestionList ({
            commit,
        }) {
            return new Promise((resolve) => {
                QuestionDB.find({}, (err, questionList) => {
                    if (err) {
                        return;
                    }
                    commit('setQuestionList', questionList);
                    resolve();
                });
            });
        },
        getThemeList ({
            commit,
        }) {
            return new Promise((resolve) => {
                ThemeDB.find({}, (err, themeList) => {
                    if (err) {
                        return;
                    }
                    commit('setThemeList', themeList);
                    resolve();
                });
            });
        },
    },
});
