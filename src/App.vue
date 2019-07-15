<template>
    <div id="app">
        <AppNav />
        <router-view
            v-if="fetched"
            class="app-main"
        />
    </div>
</template>

<script>
import AppNav from '@/components/app/AppNav';

export default {
    name: 'LeetcodeNotebook',
    components: {
        AppNav,
    },
    data () {
        return {
            fetched: false,
        };
    },
    created () {
        Promise.all([
            this.$store.dispatch('getTagList'),
            this.$store.dispatch('getTopicList'),
            this.$store.dispatch('getQuestionList'),
        ]).then(() => {
            this.fetched = true;
        });
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
