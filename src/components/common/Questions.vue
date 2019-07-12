<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>状态</th>
                    <th>题号</th>
                    <th>标题</th>
                    <th>难度</th>
                    <th>tags</th>
                    <th>topics</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in questionList"
                    :key="item._id"
                >
                    <td>
                        <ViewStatus :status="item.status" />
                    </td>
                    <td>{{ item._id }}</td>
                    <td>
                        <span
                            class="question-link"
                            @click="openQuestionLink(item.title_slug)"
                        >{{ item.title }}</span>
                    </td>
                    <td>
                        <ViewDifficulty :difficulty="item.difficulty" />
                    </td>
                    <td>
                        <ViewTags :tags="item.tags" />
                    </td>
                    <td>
                        <ViewTopics :topics="item.topics" />
                    </td>
                    <td>
                        <el-button
                            size="small"
                            @click="editItem(item)"
                        >
                            编辑
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            title="标记题目"
            :visible.sync="dialogVisible"
        >
            <QuestionFrom
                v-if="curMarkQuestion"
                ref="questionForm"
                :record="curMarkQuestion"
            />
            <footer
                slot="footer"
            >
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="doMark"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </section>
</template>

<script>
import ViewStatus from '@/components/common/ViewStatus';
import ViewDifficulty from '@/components/common/ViewDifficulty';
import ViewTags from '@/components/common/ViewTags';
import ViewTopics from '@/components/common/ViewTopics';
import QuestionFrom from '@/components/common/QuestionFrom';

import {
    QuestionDB,
} from '@/db';

export default {
    components: {
        ViewStatus,
        ViewDifficulty,
        ViewTags,
        ViewTopics,
        QuestionFrom,
    },
    props: {
        questionList: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            dialogVisible: false,
            curMarkQuestion: null,
        };
    },
    methods: {
        editItem (item) {
            this.dialogVisible = true;
            this.curMarkQuestion = item;
        },
        openQuestionLink (title_slug) {
            this.$electron.shell.openExternal(`https://leetcode.com/problems/${title_slug}/`);
        },
        doMark () {
            const data = this.$refs.questionForm.getData();

            QuestionDB.update({
                _id: data._id,
            }, data, {}, (err) => {
                if (err) {
                    this.$message({
                        type: 'warning',
                        message: 'update question err',
                    });
                }
                this.dialogVisible = false;
                this.$emit('refresh');
            });
        },
    },
};
</script>

<style scoped>
.question-link{
    cursor:pointer;
    color:#409EFF;
}
</style>
