<template>
    <div>
        <el-autocomplete
            v-model="queryString"
            style="width:100%;"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
        >
            <template v-slot="{ item }">
                {{ item.title }}( {{ item._id }} )
            </template>
        </el-autocomplete>

        <ul class="list-group">
            <li
                v-for="questionId in value"
                :key="questionId"
                class="list-group-item select-questions-list-item"
            >
                <div>
                    {{ $store.getters.questionMap[questionId].title }}
                    ({{ $store.getters.questionMap[questionId]._id }})
                </div>
                <i
                    class="el-icon-close list-group-item-icon"
                    @click="deleteQuestion(questionId)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            queryString: '',
        };
    },
    methods: {
        querySearch (queryString, cb) {
            if (!queryString) {
                cb([]);
                return;
            }

            const list = this.$store.state.questionList.filter((item) => {
                return item.title.includes(queryString) || item.title_slug.includes(queryString);
            });

            cb(list);
        },
        handleSelect ({
            _id,
        }) {
            if (!this.value.includes(_id)) {
                this.$emit('input', [
                    ...this.value,
                    _id,
                ]);
            }
        },
        deleteQuestion (questionId) {
            const value = this.value.slice(0);
            value.splice(value.indexOf(questionId), 1);
            this.$emit('input', value);
        },
    },
};
</script>

<style scoped>
.select-questions-list-item{
    display:flex;
    display: flex;
    justify-content:space-between;
}
.list-group-item-icon{
    cursor:pointer;
    line-height: inherit;
}
</style>
