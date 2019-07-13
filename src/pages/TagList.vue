<template>
    <main>
        <h1>TagList</h1>
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
