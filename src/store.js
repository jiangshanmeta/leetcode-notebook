import Vue from 'vue';
import Vuex from 'vuex';

import {
    QuestionDB,
    TopicDB,
    TagDB,
} from '@/db';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        questionList: [],
        topicList: [],
        tagList: [],
    },
    getters: {
        questionMap (state) {
            return state.questionList.reduce((obj, item) => {
                obj[item._id] = item;
                return obj;
            }, {});
        },
        topicMap (state) {
            return state.topicList.reduce((obj, item) => {
                obj[item._id] = item;
                return obj;
            }, {});
        },
        tagMap (state) {
            return state.tagList.reduce((obj, item) => {
                obj[item._id] = item;
                return obj;
            }, {});
        },
    },
    mutations: {
        setTagList (state, list) {
            state.tagList = list;
        },
        naive () {
            console.log('naive');
        },
    },
    actions: {
        getTagList ({
            state,
        }) {
            TagDB.find({}, (err, docs) => {
                if (err) {
                    return;
                }
                state.tagList = docs;
            });
        },
        getTopicList ({
            state,
        }) {
            TopicDB.find({}, (err, docs) => {
                if (err) {
                    return;
                }
                state.topicList = docs;
            });
        },
        getQuestionList ({
            state,
        }) {
            QuestionDB.find({}, (err, docs) => {
                if (err) {
                    return;
                }
                state.questionList = docs;
            });
        },
    },
});
