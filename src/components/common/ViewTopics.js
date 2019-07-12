export default {
    name: 'ViewTopics',
    functional: true,
    props: {
        topics: {
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
        const topics = props.topics;
        const topicMap = parent.$store.getters.topicMap;

        return (
            <div>
                {topics.map((topic) => {
                    return (
                        <el-tag key={topic}>
                            <router-link to={`/TopicDetail/${topic}`}>
                                {topicMap[topic].name}
                            </router-link>
                        </el-tag>
                    );
                })}
            </div>
        );
    },
};
