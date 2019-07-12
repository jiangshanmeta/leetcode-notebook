<template>
    <el-checkbox-group v-model="model">
        <el-checkbox
            v-for="item in this.$store.state.tagList"
            :key="item._id"
            :label="item._id"
        >
            {{ item.name }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            required: true,
        },
    },
    computed: {
        model: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit('input', val);
            },
        },
    },
};
</script>
