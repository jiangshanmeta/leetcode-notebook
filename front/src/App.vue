<template>
    <div id="app">
        <AppNav />
        <router-view id="app-main" />
    </div>
</template>

<script>
import AppNav from '@/components/app/AppNav';
export default {
    name:'App',
    components:{
        AppNav,
    },
};
</script>

<style>
#app{
    min-height:100vh;
    display:flex;
    flex-direction:column;
}
#app-main{
    flex:1 1 auto;
    max-width:100%;
    padding:15px;
}
</style>
