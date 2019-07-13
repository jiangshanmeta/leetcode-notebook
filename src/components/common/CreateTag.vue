<template>
    <div style="display:inline-block;padding-right:10px;">
        <el-button
            type="success"
            @click="dialogVisible = true"
        >
            创建Tag
        </el-button>
        <el-dialog
            title="创建Tag"
            :visible.sync="dialogVisible"
        >
            <TagForm
                ref="tagForm"
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
                    @click="doCreateTag"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
import TagForm from '@/components/common/TagForm';

import {
    TagDB,
} from '@/db';

export default {
    components: {
        TagForm,
    },
    data () {
        return {
            dialogVisible: false,
            record: {
                name: '',
            },
        };
    },
    methods: {
        doCreateTag () {
            const data = this.$refs.tagForm.getData();

            TagDB.insert(data, (err, newDoc) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: '创建Tag err',
                    });
                }

                this.dialogVisible = false;
                this.record = {
                    name: '',
                };
                this.$store.state.tagList = [
                    ...this.$store.state.tagList,
                    newDoc,
                ];
            });
        },
    },
};
</script>
