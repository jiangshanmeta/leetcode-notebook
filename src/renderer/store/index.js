import Vue from 'vue';
import Vuex from 'vuex';

import {
    createPersistedState, createSharedMutations,
} from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
    plugins: [
        createPersistedState(),
        createSharedMutations(),
    ],
    state: {
        questionList: [],
    },
    getters: {
        questionMap (state) {
            return state.questionList.reduce((obj, item) => {
                obj[item._id] = item;
                return obj;
            }, {});
        },
    },
});
