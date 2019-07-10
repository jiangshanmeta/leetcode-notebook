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

            <el-form-item label="状态">
                <el-checkbox-group v-model="filterStatus">
                    <el-checkbox
                        v-for="item in statusEnums"
                        :key="item.value"
                        :label="item.value"
                    >
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

        <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="50"
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

export default {
    name: 'QuestionList',
    config: {
        statusEnums,
    },
    data () {
        return {
            filterNo: 0,
            filterTitle: '',
            filterStatus: [],
            questionList: [],
            currentPage: 1,
            total: 0,
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
                filterStatus: this.filterStatus,
                currentPage: this.currentPage,
            };
        }, this.refreshListInfo, {
            immediate: true,
        });
    },
    methods: {
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
        },
        refreshListInfo (query) {
            console.log(query, QuestionDB);
        },
    },
};
</script>
