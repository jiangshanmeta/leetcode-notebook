<template>
    <el-form>
        <el-form-item label="status">
            <el-radio-group v-model="localRecord.status">
                <el-radio
                    v-for="item in statusEnums"
                    :key="item.value"
                    :label="item.value"
                >
                    {{ item.label }}
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="tags">
            <el-checkbox-group v-model="localRecord.tags">
                <el-checkbox
                    v-for="item in this.$store.state.tagList"
                    :key="item._id"
                    :label="item._id"
                >
                    {{ item.name }}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="topics">
            <el-checkbox-group v-model="localRecord.topics">
                <el-checkbox
                    v-for="item in this.$store.state.topicList"
                    :key="item._id"
                    :label="item._id"
                >
                    {{ item.name }}
                </el-checkbox>
            </el-checkbox-group>
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

export default {
    name: 'QuestionFrom',
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
