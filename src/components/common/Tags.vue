<template>
    <div>
        <el-tag
            v-for="item in tags"
            :key="item"
            @click="handleClick(item)"
        >
            {{tagMap[item].name}}
        </el-tag>
    </div>
</template>

<script>
export default {
    props:{
        tags:{
            type:Array,
            required:true,
        },
    },
    computed:{
        tagMap(){
            return this.$store.getters.tagMap;
        },
    },
    methods: {
        handleClick(id){
            this.$router.push({
                path:`/TagDetail/${id}`
            });
        },
    },
};
</script>
