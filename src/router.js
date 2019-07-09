import Vue from 'vue';
import Router from 'vue-router';

import QuestionList from '@/pages/QuestionList';
import TopicList from '@/pages/TopicList';
import TagList from '@/pages/TagList';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'QuestionList',
            component: QuestionList,
        },
        {
            path: '/TopicList',
            name: 'TopicList',
            component: TopicList,
        },
        {
            path: '/TagList',
            name: 'TagList',
            component: TagList,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
