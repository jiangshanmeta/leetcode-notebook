<template>
    <el-button
        type="danger"
        @click="init"
    >
        初始化
    </el-button>
</template>

<script>
import {
    QuestionDB,
    ThemeDB,
} from '@/db';

export default {
    methods: {
        init () {
            QuestionDB.remove({}, {
                multi: true,
            });
            this.$store.commit('setQuestionList', []);

            ThemeDB.remove({}, {
                multi: true,
            });
            this.$store.commit('setThemeList', []);
        },
    },
};
</script>
