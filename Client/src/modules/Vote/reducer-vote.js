const init = {
    votes: []

}

const voteReducer = (state = init, action) => {
    switch (action.type) {
        case "UPDATE_VOTES": {
            return {
                ...state,
                votes: action.votes
            }
        }
        case "LOG_OUT": {
            return {
                ...state,
                votes: []
            };
        }

        default:
            {
                return state;
            }
    }
};

export default voteReducer;