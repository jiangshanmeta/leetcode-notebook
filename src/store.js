import Vue from 'vue';
import Vuex from 'vuex';

import {
    createPersistedState, createSharedMutations,
} from 'vuex-electron';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState(),
        createSharedMutations(),
    ],

    state: {
        questionList: [],
        markList: [],
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
    mutations: {},
    actions: {},
});
