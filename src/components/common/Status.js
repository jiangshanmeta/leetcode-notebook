const statusClassMap = {
    0: '',
    1: 'text-info fa fa-question',
    2: 'text-success fa fa-check',
    3: 'text-danger fa fa-frog',
};

export default {
    name: 'Status',
    functional: true,
    props: {
        status: {
            type: [
                Number,
            ],
            required: true,
        },
    },
    render (h, {
        props,
    }) {
        const {
            status,
        } = props;
        return (
            <span class={statusClassMap[status]}></span>
        );
    },
};
