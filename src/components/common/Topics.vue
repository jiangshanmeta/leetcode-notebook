<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>Tags</th>
                    <th>link</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in topics"
                    :key="item._id"
                >
                    <td>
                        <router-link
                            :to="`/TopicDetail/${item._id}`"
                        >
                            {{ item.name }}
                        </router-link>
                    </td>
                    <td>
                        <ViewTags :tags="item.tags" />
                    </td>
                    <td>
                        <span
                            class="topic-link"
                            @click="openTopicLink(item.link)"
                        >
                            {{ item.link }}
                        </span>
                    </td>
                    <td>
                        <el-button
                            size="small"
                            @click="editTopic(item)"
                        >
                            编辑
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            title="编辑Topic"
            :visible.sync="dialogVisible"
        >
            <TopicForm
                v-if="curEditTopic"
                ref="topicForm"
                :record="curEditTopic"
            />

            <footer
                slot="footer"
            >
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="doEditTopic"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </section>
</template>

<script>
import ViewTags from '@/components/common/ViewTags';
import TopicForm from '@/components/common/TopicForm';

import {
    TopicDB,
} from '@/db';

export default {
    components: {
        ViewTags,
        TopicForm,
    },
    props: {
        topics: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            dialogVisible: false,
            curEditTopic: null,
        };
    },
    methods: {
        openTopicLink (link) {
            this.$electron.shell.openExternal(link);
        },
        editTopic (item) {
            this.dialogVisible = true;
            this.curEditTopic = item;
        },
        doEditTopic () {
            const data = this.$refs.topicForm.getData();

            TopicDB.update({
                _id: data._id,
            }, data, {}, (err) => {
                if (err) {
                    this.$message({
                        type: 'warning',
                        message: 'update topic err',
                    });
                }
                this.dialogVisible = false;
                this.$store.dispatch('getTopicList');
            });
        },
    },
};
</script>

<style scoped>
.topic-link{
    cursor:pointer;
    color:#409EFF;
}
</style>
