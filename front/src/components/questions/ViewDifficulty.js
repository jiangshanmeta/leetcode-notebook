const difficultyMap = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard',
};

const colorClassMap = {
    1: 'text-success',
    2: 'text-warning',
    3: 'text-danger',
};

export default {
    name: 'ViewDifficulty',
    functional: true,
    props: {
        difficulty: {
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
            difficulty,
        } = props;
        return (
            <span class={colorClassMap[difficulty]}>{difficultyMap[difficulty]}</span>
        );
    },
};
