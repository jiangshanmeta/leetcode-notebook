import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';

import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.css';
import '@/assets/css/table.css';
import '@/assets/css/text.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
