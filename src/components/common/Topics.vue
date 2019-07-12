<template>
    <div>
        <el-tag
            v-for="item in topics"
            :key="item"
            @click="handleClick(item)"
        >
            {{topicMap[item].name}}
        </el-tag>
    </div>
</template>

<script>


export default {
    props:{
        topics:{
            type:Array,
            required:true,
        },
    },
    computed:{
        topicMap(){
            return this.$store.getters.topicMap;
        },
    },
    methods: {
        handleClick(id){
            this.$router.push({
                path:`/TopicDetail/${id}`
            });
        },
    },
};
</script>
