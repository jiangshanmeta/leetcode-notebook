<template>
    <div style="display:inline-block;padding-right:10px;">
        <el-button
            type="primary"
            @click="dialogVisible = true"
        >
            创建Topic
        </el-button>
        <el-dialog
            title="创建Topic"
            :visible.sync="dialogVisible"
        >
            <TopicForm
                ref="topicForm"
                :record="record"
            />
            <footer
                slot="footer"
            >
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="doCreateTopic"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
import {
    TopicDB,
} from '@/db';

import TopicForm from '@/components/common/TopicForm';

export default {
    components: {
        TopicForm,
    },
    data () {
        return {
            dialogVisible: false,
            record: {
                name: '',
                tags: [],
                link: '',
            },
        };
    },
    methods: {
        doCreateTopic () {
            const data = this.$refs.topicForm.getData();

            TopicDB.insert(data, (err, newDoc) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: '创建Topic err',
                    });
                }

                this.dialogVisible = false;
                this.record = {
                    name: '',
                    tags: [],
                    link: '',
                };

                this.$store.state.topicList = [
                    ...this.$store.state.topicList,
                    newDoc,
                ];
            });
        },
    },
};
</script>
