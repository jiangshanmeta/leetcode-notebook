<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>题号</th>
                    <th>标题</th>
                    <th>难度</th>
                    <th>themes</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="question in questionList"
                    :key="question._id"
                >
                    <td>{{ question._id }}</td>
                    <td>
                        <span
                            class="question-link"
                            @click="openQuestionLink(question.title_slug)"
                        >{{ question.title }}</span>
                    </td>
                    <td>
                        <ViewDifficulty :difficulty="question.difficulty" />
                    </td>
                    <td>
                        <ViewTheme
                            v-if="$store.getters.questionThemeMap[question._id]"
                            :themes="$store.getters.questionThemeMap[question._id]"
                            @showTheme="showTheme"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <ThemeDetail
            v-if="detailInfo"
            :visible.sync="detailDialogVisible"
            :theme-info="detailInfo"
        />
    </section>
</template>

<script>
import ViewDifficulty from './ViewDifficulty';
import ViewTheme from './ViewTheme';
import ThemeDetail from '@/components/theme/ThemeDetail';

export default {
    components: {
        ViewDifficulty,
        ViewTheme,
        ThemeDetail,
    },
    props: {
        questionList: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            detailDialogVisible: false,
            detailInfo: null,
        };
    },
    methods: {
        openQuestionLink (title_slug) {
            this.$electron.shell.openExternal(`https://leetcode.com/problems/${title_slug}/`);
        },
        showTheme (theme) {
            this.detailInfo = theme;
            this.detailDialogVisible = true;
        },
    },
};
</script>

<style scoped>
.question-link{
    cursor:pointer;
    color:#409EFF;
}
</style>
