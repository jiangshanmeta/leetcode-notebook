<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in tags"
                    :key="item._id"
                >
                    <td>{{ item.name }}</td>
                    <td>
                        <el-button
                            size="small"
                            @click="editTag(item)"
                        >
                            编辑
                        </el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            title="编辑Tag"
            :visible.sync="dialogVisible"
        >
            <TagForm
                v-if="curEditTag"
                ref="tagForm"
                :record="curEditTag"
            />

            <footer
                slot="footer"
            >
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="doEditTag"
                >
                    确 定
                </el-button>
            </footer>
        </el-dialog>
    </section>
</template>

<script>
import TagForm from '@/components/common/TagForm';

import {
    TagDB,
} from '@/db';

export default {
    components: {
        TagForm,
    },
    props: {
        tags: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            dialogVisible: false,
            curEditTag: null,
        };
    },
    methods: {
        editTag (item) {
            this.dialogVisible = true;
            this.curEditTag = item;
        },
        doEditTag () {
            const data = this.$refs.tagForm.getData();

            TagDB.update({
                _id: data._id,
            }, data, {}, (err) => {
                if (err) {
                    this.$message({
                        type: 'warning',
                        message: 'update tag err',
                    });
                }
                this.dialogVisible = false;
                this.$store.dispatch('getTagList');
            });
        },
    },
};
</script>
