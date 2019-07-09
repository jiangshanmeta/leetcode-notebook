import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'QuestionList',
            component: require('@/pages/QuestionList').default,
        },
        {
            path: '/TopicList',
            name: 'TopicList',
            component: require('@/pages/TopicList').default,
        },
        {
            path: '/TagList',
            name: 'TagList',
            component: require('@/pages/TagList').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
