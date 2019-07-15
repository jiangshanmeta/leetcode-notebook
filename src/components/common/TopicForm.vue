<template>
    <el-form>
        <el-form-item label="名称">
            <el-input v-model="localRecord.name" />
        </el-form-item>
        <el-form-item label="tags">
            <SelectTag v-model="localRecord.tags" />
        </el-form-item>
        <el-form-item label="link">
            <el-input v-model="localRecord.link" />
        </el-form-item>
    </el-form>
</template>

<script>
import SelectTag from '@/components/editors/SelectTag';
export default {
    components: {
        SelectTag,
    },
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
    methods: {
        getData () {
            return JSON.parse(JSON.stringify(this.localRecord));
        },
    },
};
</script>
