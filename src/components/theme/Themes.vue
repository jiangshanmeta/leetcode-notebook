<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>theme名称</th>
                    <th>问题数量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr
                    v-for="theme in $store.state.themeList"
                    :key="theme._id"
                >
                    <td>{{ theme.name }}</td>
                    <td>{{ theme.questions.length }}</td>
                    <td>
                        <el-button
                            type="success"
                            @click="showThemeDetail(theme)"
                        >
                            查看详情
                        </el-button>
                        <el-button
                            type="primary"
                            @click="showThemeEdit(theme)"
                        >
                            编辑
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ThemeDetail
            v-if="detailInfo"
            :visible.sync="detailDialogVisible"
            :theme-info="detailInfo"
        />
        <el-dialog
            v-if="editInfo"
            title="编辑theme"
            :visible.sync="editDialogVisible"
        >
            <template v-slot:default>
                <ThemeForm
                    ref="themeForm"
                    :record="editInfo"
                />
            </template>
            <template v-slot:footer>
                <el-button @click="editDialogVisible = false">
                    关闭
                </el-button>
                <el-button
                    type="primary"
                    @click="doEditTheme"
                >
                    确 定
                </el-button>
            </template>
        </el-dialog>
    </section>
</template>

<script>
import ThemeForm from './ThemeForm';
import ThemeDetail from './ThemeDetail';

import {
    ThemeDB,
} from '@/db';

export default {
    components: {
        ThemeForm,
        ThemeDetail,
    },
    data () {
        return {
            detailDialogVisible: false,
            detailInfo: null,
            editDialogVisible: false,
            editInfo: null,
        };
    },
    methods: {
        showThemeDetail (theme) {
            this.detailInfo = theme;
            this.detailDialogVisible = true;
        },
        showThemeEdit (theme) {
            this.editInfo = theme;
            this.editDialogVisible = true;
        },
        doEditTheme (theme) {
            const data = this.$refs.themeForm.getData();
            ThemeDB.update({
                _id: data._id,
            }, data, (err) => {
                if (err) {
                    this.$message({
                        type: 'warning',
                        message: '编辑theme失败',
                    });
                    return;
                }
                const themeList = this.$store.state.themeList.slice(0);
                const index = themeList.findIndex(item => item._id === data._id);
                themeList[index] = data;
                this.$store.commit('setThemeList', themeList);
                this.editDialogVisible = false;
            });
        },
    },
};
</script>
