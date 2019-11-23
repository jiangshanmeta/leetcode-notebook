import axios from './index';

function syncQuestions(){
    return axios.get('/question/syncQuestions');
}

function getQuestionList(params){
    return axios.get('/question/getQuestionList',{
        params,
    });
}

function getQuestionByIds(questionIds){
    return axios.get('/question/getQuestionByIds',{
        params:{
            questionIds,
        },
    });
}

export {
    syncQuestions,
    getQuestionList,
    getQuestionByIds,
};