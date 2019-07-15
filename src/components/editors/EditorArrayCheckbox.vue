<template>
    <el-checkbox-group v-model="model">
        <el-checkbox
            v-for="item in candidate"
            :key="item[valuefield]"
            :label="item[valuefield]"
        >
            {{ item[labelfield] }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';

export default {
    mixins: [
        _editor_model_mixin,
    ],
    props: {
        value: {
            type: Array,
            required: true,
        },
        candidate: {
            type: Array,
            required: true,
        },
        labelfield: {
            type: String,
            default: 'label',
        },
        valuefield: {
            type: String,
            default: 'value',
        },
    },
};
</script>
