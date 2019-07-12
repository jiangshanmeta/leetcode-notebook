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
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="name" />
                </el-form-item>
                <el-form-item label="tags">
                    <SelectTag v-model="tags" />
                </el-form-item>
                <el-form-item label="link">
                    <el-input v-model="link" />
                </el-form-item>
            </el-form>
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

import SelectTag from '@/components/common/SelectTag';

export default {
    components: {
        SelectTag,
    },
    data () {
        return {
            dialogVisible: false,
            name: '',
            tags: [],
            link: '',
        };
    },
    methods: {
        doCreateTopic () {
            const data = {};
            data.name = this.name;
            data.tags = this.tags;
            data.link = this.link;

            TopicDB.insert(data, (err, newDoc) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: '创建Topic err',
                    });
                }

                this.dialogVisible = false;
                this.name = '';
                this.tags = [];
                this.link = '';
                this.$store.state.topicList = [
                    ...this.$store.state.topicList,
                    newDoc,
                ];
            });
        },
    },
};
</script>
