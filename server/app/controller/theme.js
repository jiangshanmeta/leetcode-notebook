'use strict';

const Controller = require('egg').Controller;

class ThemeController extends Controller {
    async doCreateTheme() {
        const {
            ctx,
        } = this;

        const data = ctx.request.body;
        data.status = 1;
        data.createTS = Date.now();
        data.lastModifiedTS = Date.now();

        await ctx.model.Theme.create(data);
        ctx.body = {
            rstno: 1,
        };

    }
    async doUpdateTheme() {
        const {
            ctx,
        } = this;

        const data = ctx.request.body;
        data.lastModifiedTS = Date.now();
        await ctx.model.Theme.update({
            _id: data._id,
        }, data);

        ctx.body = {
            rstno: 1,
        };

    }
    async doDeleteTheme() {
        const {
            ctx,
        } = this;

        const id = ctx.params.id;

        await ctx.model.Theme.update({
            _id: id,
        }, {
            status: 2,
        });

        ctx.body = {
            rstno: 1,
        };

    }

    async getThemeList() {
        const {
            ctx,
        } = this;

        const page = parseInt(ctx.query.page);
        const pageSize = parseInt(ctx.query.pageSize);
        const sql = {
            status: 1,
        };

        const themeList = await ctx.model.Theme.find(sql).skip((page - 1) * pageSize).limit(pageSize);

        const count = await ctx.model.Theme.count(sql);

        ctx.body = {
            rstno: 1,
            themeList,
            total: count,
        };

    }

    async getThemeByQuestionIds() {
        const {
            ctx,
        } = this;

        const questionIds = ctx.queries.questionIds.map(id => +id);

        const themeList = await ctx.model.Theme.find({
            status: 1,
            questions: {
                $in: questionIds,
            },
        });
        ctx.body = {
            rstno: 1,
            themeList,
        };

    }


}

module.exports = ThemeController;
