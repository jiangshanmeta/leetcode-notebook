<template>
	<div id="app">
		<AppNav/>
		<router-view class="app-main"></router-view>
	</div>
</template>

<script>
import AppNav from '@/components/index/AppNav';
import {
    QuestionDB,
} from '@/db';

export default {
    name: 'leetcode-notebook',
    components: {
        AppNav,
    },
    created () {
        QuestionDB.find({}, (err, docs) => {
            if (err) {
                return this.$message({
                    type: 'warning',
                    message: '拉取本地题目数据失败',
                });
            }
            this.$store.state.questionList = docs;
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
