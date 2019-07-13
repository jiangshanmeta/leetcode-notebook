<template>
    <main>
        <Topics :topics="$store.state.topicList" />
    </main>
</template>

<script>
import Topics from '@/components/common/Topics';

export default {
    name: 'TopicList',
    components: {
        Topics,
    },
};
</script>
