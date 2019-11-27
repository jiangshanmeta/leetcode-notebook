<template>
    <div>
        <CreateTheme
            @update="getThemeList"
        />
        <table class="table">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>关联题目数量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="theme in themeList"
                    :key="theme._id"
                >
                    <td>{{ theme.name }}</td>
                    <td class="text-center">
                        {{ theme.questions.length }}
                    </td>
                    <td class="text-center">
                        <el-button
                            type="success"
                            @click="showThemeDetail(theme)"
                        >
                            详情
                        </el-button>

                        <el-button
                            type="primary"
                            @click="showThemeEdit(theme)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            @click="doDeleteTheme(theme)"
                        >
                            删除
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ThemeDetail
            v-if="detailInfo"
            :visible.sync="detailDialogVisible"
            v-bind="detailInfo"
        />
        
        <el-dialog
            v-if="editThemeInfo"
            fullscreen
            title="编辑theme"
            :visible.sync="editDialogVisible"
        >
            <template v-slot:default>
                <ThemeForm
                    ref="themeForm"
                    :record="editThemeInfo"
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


        <el-pagination
            style="text-align:center;"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import CreateTheme from '@/components/themes/CreateTheme';
import ThemeDetail from '@/components/themes/ThemeDetail';
import ThemeForm from '@/components/themes/ThemeForm';

import {
    getThemeList,
    doUpdateTheme,
    doDeleteTheme,
} from '@/server/theme';

export default{
    name:'Themes',
    components:{
        CreateTheme,
        ThemeDetail,
        ThemeForm,
    },
    data(){
        return {
            currentPage:1,
            pageSize:20,
            total:0,
            themeList:[],
            detailInfo:null,
            detailDialogVisible:false,
            editThemeInfo:null,
            editDialogVisible:false,
        };
    },
    created(){
        this.getThemeList();
    },
    methods:{
        handleCurrentChange(currentPage){
            this.currentPage = currentPage;
            this.getThemeList();
        },
        getThemeList(){
            const query = {
                page:this.currentPage,
                pageSize:this.pageSize,
            };

            getThemeList(query).then((json)=>{
                this.total = json.total;
                this.themeList = json.themeList;
            });
        },
        showThemeDetail(theme){
            this.detailInfo = theme;
            this.detailDialogVisible = true;
        },
        showThemeEdit(theme){
            this.editThemeInfo = theme;
            this.editDialogVisible = true;
        },
        doEditTheme(){
            const data = this.$refs.themeForm.getData();
            doUpdateTheme(data).then(()=>{
                this.editDialogVisible = false;
                this.getThemeList();
            });
        },
        doDeleteTheme(theme){
            this.$confirm(`确认删除 ${theme.name}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                doDeleteTheme(theme._id).then(this.getThemeList);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });       
            });
        },
    },
};
</script>