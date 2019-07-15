<template>
    <el-radio-group v-model="model">
        <el-radio
            v-for="item in candidate"
            :key="item[valuefield]"
            :label="item[valuefield]"
        >
            {{ item[labelfield] }}
        </el-radio>
    </el-radio-group>
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';

export default {
    mixins: [
        _editor_model_mixin,
    ],
    props: {
        value: {
            type: [
                Number, String,
            ],
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
