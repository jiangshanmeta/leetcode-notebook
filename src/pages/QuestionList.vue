<template>
    <main>
        <el-form :inline="true">
            <el-form-item label="题号">
                <el-input-number
                    v-model="filterNo"
                    :controls="false"
                    label="题号"
                />
            </el-form-item>

            <el-form-item label="题目">
                <el-input
                    v-model="filterTitle"
                    placeholder="题目"
                    style="width:180px;"
                />
            </el-form-item>
        </el-form>

        <Questions
            :question-list="questionList"
            @refresh="refreshListInfo"
        />

        <el-pagination
            style="text-align:center;"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        />
    </main>
</template>

<script>
import {
    QuestionDB,
} from '@/db';

import {
    statusEnums,
} from '@/enums';

import Questions from '@/components/question/Questions';

export default {
    name: 'QuestionList',
    config: {
        statusEnums,
    },
    components: {
        Questions,
    },
    data () {
        return {
            filterNo: 0,
            filterTitle: '',
            questionList: [],
            currentPage: 1,
            total: 0,
            pageSize: 50,
        };
    },
    watch: {
        '$store.state.questionList': 'refreshListInfo',
    },
    created () {
        this.$watch(() => {
            return {
                filterNo: this.filterNo,
                filterTitle: this.filterTitle,

            };
        }, () => {
            this.currentPage = 1;
            this.refreshListInfo();
        }, {
            immediate: true,
        });
    },
    methods: {
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.refreshListInfo();
        },
        refreshListInfo () {
            const dbQuery = {};
            if (this.filterNo !== 0) {
                dbQuery['_id'] = this.filterNo;
            }

            if (this.filterTitle) {
                dbQuery['$or'] = [
                    {
                        title: {
                            $regex: new RegExp(this.filterTitle),
                        },
                    },
                    {
                        title_slug: {
                            $regex: new RegExp(this.filterTitle),
                        },
                    },
                ];
            }

            QuestionDB.count(dbQuery, (err, count) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: 'count err',
                    });
                }
                this.total = count;
            });

            QuestionDB
                .find(dbQuery)
                .skip((this.currentPage - 1) * this.pageSize)
                .limit(this.pageSize)
                .exec((err, docs) => {
                    if (err) {
                        return this.$message({
                            type: 'warning',
                            message: 'getList err',
                        });
                    }
                    this.questionList = docs;
                });
        },

    },
};
</script>
