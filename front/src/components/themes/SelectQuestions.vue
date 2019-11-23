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
                <div v-if="$store.getters.questionMap[questionId]">
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
import {
    getQuestionList,
    getQuestionByIds,
} from '@/server/question';

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
    watch:{
        value:{
            handler(){
                const noCacheQuestion = this.value.filter((questionId)=>{
                    return !this.$store.getters.questionMap[questionId];
                });
                if(noCacheQuestion.length){
                    getQuestionByIds(noCacheQuestion).then((json)=>{
                        this.$store.dispatch('addQuestion',json.questionList);
                    });
                }

            },
            immediate:true,
        },
    },
    methods: {
        querySearch (queryString, cb) {
            if (!queryString) {
                cb([]);
                return;
            }
            const query = {
                search:queryString,
                page:1,
                pageSize:50,
            };
            getQuestionList(query).then((json)=>{
                cb(json.questionList);
                this.$store.dispatch('addQuestion',json.questionList);
            });
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
