<template>
    <div>
        <CreateTheme />
        <Themes />
    </div>
</template>

<script>
import CreateTheme from '@/components/theme/CreateTheme';
import Themes from '@/components/theme/Themes';

export default {
    components: {
        CreateTheme,
        Themes,
    },
};
</script>
