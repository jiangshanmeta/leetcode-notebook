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

            <el-menu-item index="/themeList">
                Themes
            </el-menu-item>
        </el-menu>

        <div class="app-nav-operator-container">
            <SyncQuestion />
            <Init v-if="process.env.NODE_ENV === 'development'" />
        </div>
    </nav>
</template>

<script>
import Init from '@/components/app/Init';
import SyncQuestion from '@/components/app/SyncQuestion';

export default {
    name: 'AppNav',
    config: {
        process: process,
    },
    components: {
        Init,
        SyncQuestion,
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
