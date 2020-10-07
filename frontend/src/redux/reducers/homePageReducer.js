const INITIAL_STATE = {
    messages: [],
};

const messageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INSERT_MESSAGE':
            return {
                ...state,
                messages: [...state.messages," {"+  action.message + '}'],
            };
        default:
            return state;
    }
};

export default messageReducer;