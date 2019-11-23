import Vue from 'vue';
import VueRouter from 'vue-router';
import Questions from '@/views/Questions.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Questions',
        component: Questions,
    },
    {
        path: '/themes',
        name: 'Themes',
        component: () => import('@/views/Themes'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
