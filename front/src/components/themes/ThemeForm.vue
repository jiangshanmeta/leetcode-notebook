<template>
    <el-form>
        <el-form-item label="名称">
            <el-input v-model="localRecord.name" />
        </el-form-item>
        <el-form-item label="关联题目">
            <SelectQuestions v-model="localRecord.questions" />
        </el-form-item>
        <el-form-item label="article">
            <el-input
                v-model="localRecord.article"
                type="textarea"
                :autosize="{ minRows: 20 }"
            />
        </el-form-item>
    </el-form>
</template>

<script>
import SelectQuestions from './SelectQuestions';

export default {
    name:'ThemeForm',
    components:{
        SelectQuestions,
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
