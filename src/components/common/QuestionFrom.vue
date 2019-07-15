<template>
    <el-form>
        <el-form-item label="status">
            <EditorEnumRadio
                v-model="localRecord.status"
                :candidate="statusEnums"
                labelfield="label"
                valuefield="value"
            />
        </el-form-item>
        <el-form-item label="tags">
            <SelectTag v-model="localRecord.tags" />
        </el-form-item>
        <el-form-item label="topics">
            <EditorArrayCheckbox
                v-model="localRecord.topics"
                :candidate="$store.state.topicList"
                labelfield="name"
                valuefield="_id"
            />
        </el-form-item>
        <el-form-item label="link">
            <el-input v-model="localRecord.link" />
        </el-form-item>
    </el-form>
</template>

<script>
import {
    statusEnums,
} from '@/enums';

import SelectTag from '@/components/editors/SelectTag';

export default {
    name: 'QuestionFrom',
    components: {
        SelectTag,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
    },
    config: {
        statusEnums,
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
