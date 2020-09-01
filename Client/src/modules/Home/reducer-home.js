const init = {
    user: null,
    pending: false
}

const homeReducer = (state = init, action) => {
    switch (action.type) {
        case "UPDATE_USER": {
            return {
                ...state,
                user: action.user
            }
        }
        case "LOG_OUT": {
            localStorage.clear();
            return {
                ...state,
                user: null
            };
        }
        case "PENDING": {
            return {
                ...state,
                pending: action.state
            };
        }
        default:
            {
                return state;
            }
    }
};

export default homeReducer;