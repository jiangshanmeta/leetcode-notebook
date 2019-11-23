'use strict';
const https = require('https');

function getQuestions() {
    return new Promise(resolve => {
        https.get('https://leetcode.com/api/problems/all/', res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', chunk => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', e => {
            console.error(`出现错误: ${e.message}`);
        });
    });
}

const Controller = require('egg').Controller;

class QuestionController extends Controller {
    async syncQuestions() {
        const {
            ctx,
        } = this;

        const json = await getQuestions();
        const list = json.stat_status_pairs.map(item => {
            const data = {};
            const stat = item.stat;
            data._id = stat.frontend_question_id;
            data.title = stat.question__title;
            data.title_slug = stat.question__title_slug;
            data.difficulty = item.difficulty.level;
            return data;
        });

        await ctx.model.Question.deleteMany({});
        await ctx.model.Question.create(list);

        ctx.body = {
            rstno: 1,
        };
    }

    async getQuestionList() {
        const {
            ctx,
        } = this;

        const search = ctx.query.search;
        const page = parseInt(ctx.query.page);
        const pageSize = parseInt(ctx.query.pageSize);

        const searchId = parseInt(search);
        if (Number.isNaN(searchId)) {
            const sql = {
                $or: [
                    {
                        title: {
                            $regex: search,
                        },
                    },
                    {
                        title_slug: {
                            $regex: search,
                        },
                    },
                ],
            };

            const count = await ctx.model.Question.count(sql);
            const questionList = await ctx.model.Question.find(sql).sort({
                _id: 1,
            }).skip((page - 1) * pageSize)
                .limit(pageSize);

            ctx.body = {
                rstno: 1,
                questionList,
                total: count,
            };
        } else {
            const question = await ctx.model.Question.findById(searchId);
            ctx.body = {
                rstno: 1,
                questionList: [
                    question,
                ],
                total: 1,
            };
        }
    }

    async getQuestionByIds() {
        const {
            ctx,
        } = this;
        const questionIds = ctx.queries.questionIds.map(id => +id);

        const questionList = await ctx.model.Question.find({
            _id: {
                $in: questionIds,
            },
        });

        ctx.body = {
            rstno: 1,
            questionList,
        };

    }

}

module.exports = QuestionController;
