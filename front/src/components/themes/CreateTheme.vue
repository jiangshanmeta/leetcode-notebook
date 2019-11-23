<template>
    <section>
        <el-button
            type="success"
            @click="dialogVisible = true"
        >
            创建Theme
        </el-button>
        <el-dialog
            title="创建Theme"
            fullscreen
            :visible.sync="dialogVisible"
        >
            <ThemeForm
                ref="themeForm"
                :record="record"
            />
            <footer
                slot="footer"
            >
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="doCreateTheme"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </section>
</template>

<script>
import ThemeForm from './ThemeForm';

import {
    doCreateTheme,
} from '@/server/theme';

export default {
    name:'CreateTheme',
    components:{
        ThemeForm,
    },
    data(){
        return {
            dialogVisible: false,
            record: {
                name: '',
                questions: [],
                article:"",
            },
        };
    },
    methods:{
        doCreateTheme(){
            const data = this.$refs.themeForm.getData();
            doCreateTheme(data).then(()=>{
                this.dialogVisible = false;
                this.record = {
                    name: '',
                    questions: [],
                    article:'',
                };
                this.$emit('update');
            });
        },
    },
};
</script>

<style>

</style>