import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import VueConfigs from 'vue-configs';
import router from './router';
import store from './store';
Vue.use(ElementUI);
Vue.use(require('vue-electron'));
Vue.use(VueConfigs, {
    optionKeys: [
        'config',
    ],
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
