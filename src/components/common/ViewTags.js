export default {
    name: 'ViewTags',
    functional: true,
    props: {
        tags: {
            type: [
                Array,
            ],
            required: true,
        },
    },
    render (h, {
        props,
        parent,
    }) {
        const tags = props.tags;
        const tagMap = parent.$store.getters.tagMap;

        return (
            <div>
                {tags.map((tag) => {
                    return (
                        <el-tag key={tag}>
                            <router-link to={`/TagDetail/${tag}`}>
                                {tagMap[tag].name}
                            </router-link>
                        </el-tag>
                    );
                })}
            </div>
        );
    },
};
