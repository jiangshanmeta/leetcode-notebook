<template>
    <div>
        <el-tag
            v-for="theme in themes"
            :key="theme._id"
            class="theme-tag"
            @click="handleClick(theme)"
        >
            {{ theme.name }}
        </el-tag>
    </div>
</template>

<script>
export default {
    props: {
        themes: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleClick (theme) {
            this.$emit('showTheme', theme);
        },
    },
};
</script>

<style scoped>
.theme-tag{
    cursor:pointer;
    margin:0 10px;
}
</style>
