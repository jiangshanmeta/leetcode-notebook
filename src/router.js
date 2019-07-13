import Vue from 'vue';
import Router from 'vue-router';

import QuestionList from '@/pages/QuestionList';
import TopicList from '@/pages/TopicList';
import TagList from '@/pages/TagList';
import TagDetail from '@/pages/TagDetail';
import TopicDetail from '@/pages/TopicDetail';

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
            path: '/TagDetail/:tag',
            name: 'TagDetail',
            component: TagDetail,
            props: true,
        },
        {
            path: '/TopicDetail/:topic',
            name: 'TopicDetail',
            component: TopicDetail,
            props: true,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
