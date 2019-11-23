import axios from 'axios';
import Vue from 'vue';

const axiosIns = axios.create({});
axiosIns.defaults.baseURL = './api/';
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';

axiosIns.interceptors.response.use(function (response) {
    const data = response.data;
    const status = response.status;
    if (status === 200 || status === 304) {
        const rstno = data.rstno;
        if (rstno > 0) {
            return data;
        }
        return Promise.reject(response);
    } 
    return Promise.reject(response);
    
});

const ajaxMethod = [
    'get', 'post',
];
const api = {};
ajaxMethod.forEach((method) => {
    api[method] = function (uri, data, config) {
        return new Promise(function (resolve) {
            axiosIns[method](uri, data, config).then((json) => {
                resolve(json);
            }).catch((response) => {
                if (response.status === 200 && response.data.rstno < 0) {
                    Vue.prototype.$message(response.data.errmsg);
                }
            });
        });
    };
});

Object.freeze(api);

export default api;
