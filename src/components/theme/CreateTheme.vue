<template>
    <div>
        <el-button
            type="success"
            @click="dialogVisible = true"
        >
            创建Theme
        </el-button>
        <el-dialog
            title="创建Theme"
            :visible.sync="dialogVisible"
        >
            <ThemeForm
                ref="themeForm"
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
                    @click="doCreateTheme"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
import ThemeForm from './ThemeForm';

import {
    ThemeDB,
} from '@/db';

export default {
    components: {
        ThemeForm,
    },
    data () {
        return {
            dialogVisible: false,
            record: {
                name: '',
                questions: [],
            },
        };
    },
    methods: {
        doCreateTheme () {
            const data = this.$refs.themeForm.getData();

            ThemeDB.insert(data, (err, newTheme) => {
                if (err) {
                    this.$message({
                        type: 'warning',
                        message: '创建Theme失败',
                    });
                    return;
                }

                this.dialogVisible = false;
                this.record = {
                    name: '',
                    questions: [],
                };

                this.$store.commit('setThemeList', [
                    ...this.$store.state.themeList,
                    newTheme,
                ]);
            });
        },
    },
};
</script>
