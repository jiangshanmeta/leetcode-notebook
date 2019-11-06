import Vue from 'vue';
import Router from 'vue-router';

import QuestionList from '@/pages/QuestionList';
import ThemeList from '@/pages/ThemeList';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'questionList',
            component: QuestionList,
        },
        {
            path: '/themeList',
            name: 'themeList',
            component: ThemeList,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
