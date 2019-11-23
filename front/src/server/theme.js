import axios from './index';

function doCreateTheme(data){
    return axios.post('/theme/doCreateTheme',data);
}

function doUpdateTheme(data){
    return axios.post('/theme/doUpdateTheme',data);
}

function doDeleteTheme(id){
    return axios.post(`/theme/doDeleteTheme/${id}`);
}

function getThemeList(params){
    return axios.get('/theme/getThemeList',{
        params,
    });
}

function getThemeByQuestionIds(questionIds){
    return axios.get('/theme/getThemeByQuestionIds',{
        params:{
            questionIds,
        },
    });
}

export {
    doCreateTheme,
    doUpdateTheme,
    doDeleteTheme,
    getThemeList,
    getThemeByQuestionIds,
};