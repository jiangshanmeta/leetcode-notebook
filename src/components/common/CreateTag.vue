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
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="name" />
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
                    @click="doCreateTag"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
import {
    TagDB,
} from '@/db';

export default {
    data () {
        return {
            dialogVisible: false,
            name: '',
        };
    },
    methods: {
        doCreateTag () {
            const data = {};
            data.name = this.name;
            TagDB.insert(data, (err, newDoc) => {
                if (err) {
                    return this.$message({
                        type: 'warning',
                        message: '创建Tag err',
                    });
                }

                this.dialogVisible = false;
                this.name = '';
                this.$store.state.tagList = [
                    ...this.$store.state.tagList,
                    newDoc,
                ];
            });
        },
    },
};
</script>
