<template>
    <main>
        TagList
        <Tags :tags="$store.state.tagList" />
    </main>
</template>

<script>
import Tags from '@/components/common/Tags';

export default {
    name: 'TagList',
    components: {
        Tags,
    },
};
</script>
