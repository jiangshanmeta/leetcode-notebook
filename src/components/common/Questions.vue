<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>状态</th>
                    <th>题号</th>
                    <th>标题</th>
                    <th>难度</th>
                    <th>tags</th>
                    <th>topics</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in questionList"
                    :key="item._id"
                >
                    <td>
                        <Status :status="item.status" />
                    </td>
                    <td>{{ item._id }}</td>
                    <td>
                        <span 
                            class="question-link"
                            @click="openQuestionLink(item.title_slug)"
                            >{{ item.title }}</span>
                    </td>
                    <td>
                        <Difficulty :difficulty="item.difficulty" />
                    </td>
                    <td>
                        <Tags :tags="item.tags" />
                    </td>
                    <td>
                        <Topics :topics="item.topics" />
                    </td>
                    <td>
                        <el-button
                            size="small"
                            @click="editItem(item)"
                        >
                            编辑
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            title="标记题目"
            :visible.sync="dialogVisible"
        >
            <MarkFrom v-if="curMarkQuestion" :record="curMarkQuestion"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doMark">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
import Status from '@/components/common/Status';
import Difficulty from '@/components/common/Difficulty';
import Tags from '@/components/common/Tags';
import Topics from '@/components/common/Topics';
import MarkFrom from '@/components/common/MarkFrom';

export default{
    props:{
        questionList:{
            type:Array,
            required:true,
        },
    },
    components: {
        Status,
        Difficulty,
        Tags,
        Topics,
        MarkFrom,
    },
    data(){
        return {
            dialogVisible:false,
            curMarkQuestion:null,
        };
    },
    methods: {
        editItem (item) {
            this.dialogVisible = true;
            this.curMarkQuestion = item;
        },
        openQuestionLink(title_slug){
            this.$electron.shell.openExternal(`https://leetcode.com/problems/${title_slug}/`)
        },
        doMark(){

        },
    },
}
</script>

<style scoped>
.question-link{
    cursor:pointer;
    color:#409EFF;
}
</style>