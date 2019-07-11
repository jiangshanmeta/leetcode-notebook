<template>
    <el-form />
</template>

<script>
export default {
    name: 'MarkFrom',
    props: {
        record: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            localRecord: {},
        };
    },
    watch: {
        record: {
            handler (record) {
                this.localRecord = JSON.parse(JSON.stringify(record));
            },
            immediate: true,
        },
    },
};
</script>
