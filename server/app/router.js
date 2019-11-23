'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router, controller,
    } = app;
    router.get('/question/syncQuestions', controller.question.syncQuestions);
    router.get('/question/getQuestionList', controller.question.getQuestionList);
    router.get('/question/getQuestionByIds', controller.question.getQuestionByIds);

    router.post('/theme/doCreateTheme', controller.theme.doCreateTheme);
    router.post('/theme/doUpdateTheme', controller.theme.doUpdateTheme);
    router.post('/theme/doDeleteTheme/:id', controller.theme.doDeleteTheme);
    router.get('/theme/getThemeList', controller.theme.getThemeList);
    router.get('/theme/getThemeByQuestionIds', controller.theme.getThemeByQuestionIds);
};
