<template>
    <EditorArrayCheckbox
        v-model="model"
        :candidate="$store.state.tagList"
        labelfield="name"
        valuefield="_id"
    />
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';

export default {
    mixins: [
        _editor_model_mixin,
    ],
};
</script>
