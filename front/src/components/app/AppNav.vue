<template>
    <nav class="app-nav">
        <el-menu
            mode="horizontal"
            :default-active="$route.path"
            :router="true"
        >
            <el-menu-item index="/">
                Questions
            </el-menu-item>

            <el-menu-item index="/themes">
                Themes
            </el-menu-item>
        </el-menu>

        <div class="app-nav-operator-container">
            <el-button 
                type="success"
                @click="doSyncQuestions"
            >
                同步问题
            </el-button>
        </div>
    </nav>
</template>

<script>
import {
    syncQuestions,
} from '@/server/question';

export default {
    name:'AppNav',
    methods:{
        doSyncQuestions(){
            this.$message({
                type:'success',
                message:'正在请求题目',
            });

            syncQuestions().then(()=>{
                this.$store.commit('updateServerQuestionVersion');
                this.$message({
                    type:'success',
                    message:'同步题目成功',
                });
            });
        },
    },
};
</script>

<style>
.app-nav{
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid #e6e6e6;
}
.app-nav >>> .el-menu{
    border:none;
}
.app-nav-operator-container{
    padding:15px 15px 0 0;
}
</style>