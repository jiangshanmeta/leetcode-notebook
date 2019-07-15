import Vue from 'vue';
import VueElectron from 'vue-electron';
import VueConfigs from 'vue-configs';
import ElementUI from 'element-ui';

import App from './App.vue';
import router from './router';
import store from './store';
import EditorArrayCheckbox from '@/components/editors/EditorArrayCheckbox';
import EditorEnumRadio from '@/components/editors/EditorEnumRadio';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/table.css';
import '@/assets/css/text.css';

Vue.use(ElementUI);
Vue.use(VueElectron);
Vue.use(VueConfigs, {
    optionKeys: [
        'config',
    ],
});
Vue.component('EditorArrayCheckbox', EditorArrayCheckbox);
Vue.component('EditorEnumRadio', EditorEnumRadio);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
