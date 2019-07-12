<template>
    <nav class="app-nav">
        <el-menu
            mode="horizontal"
            :router="true"
            
        >
            <el-menu-item index="/">
                Questions
            </el-menu-item>
            <el-menu-item index="/TopicList">
                Topics
            </el-menu-item>
            <el-menu-item index="/TagList">
                Tags
            </el-menu-item>
        </el-menu>

        <div class="app-nav-operator-container">
            <CreateTag/>
            <SyncQuestion/>
            <Init/>
        </div>
    </nav>
</template>

<script>
import Init from "@/components/common/Init"
import SyncQuestion from "@/components/common/SyncQuestion"
import CreateTag from "@/components/common/CreateTag"


export default {
    name: 'AppNav',
    components:{
        Init,
        SyncQuestion,
        CreateTag,
    },
};
</script>

<style scoped>
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
