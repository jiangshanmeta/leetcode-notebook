<template>
    <div id="app">
        <AppNav />
        <router-view class="app-main" />
    </div>
</template>

<script>
import AppNav from '@/components/app/AppNav';

export default {
    name: 'LeetcodeNotebook',
    components: {
        AppNav,
    },
    beforeCreate () {
        this.$store.dispatch('getTagList');
        this.$store.dispatch('getTopicList');
        this.$store.dispatch('getQuestionList');
    },
};
</script>

<style scoped>
#app{
    min-height:100vh;
    display:flex;
    flex-direction:column;
}
.app-main{
    flex:1 1 auto;
    max-width:100%;
    padding:15px;
}
</style>
