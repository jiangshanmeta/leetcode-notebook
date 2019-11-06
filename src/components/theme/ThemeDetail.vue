<template>
    <el-dialog
        title="theme详情"
        :visible="visible"
        @update:visible="updateVisible"
    >
        <template v-slot:default>
            <h2>{{ themeInfo.name }}</h2>
            <ul class="list-group">
                <li
                    v-for="questionId in themeInfo.questions"
                    :key="questionId"
                    class="list-group-item"
                >
                    {{ $store.getters.questionMap[questionId].title }}
                    ( {{ $store.getters.questionMap[questionId]._id }} )
                </li>
            </ul>
        </template>
        <template v-slot:footer>
            <el-button @click="closeDialog">
                关闭
            </el-button>
        </template>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        themeInfo: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updateVisible (visible) {
            this.$emit('update:visible', visible);
        },
        closeDialog () {
            this.updateVisible(false);
        },
    },
};
</script>
