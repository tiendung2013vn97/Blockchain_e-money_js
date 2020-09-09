const init = {
    history: [],
    balance: null

}

const walletReducer = (state = init, action) => {
    switch (action.type) {
        case "UPDATE_BALANCE": {
            return {
                ...state,
                balance: action.balance
            }
        }
        case "UPDATE_HISTORY": {
            return {
                ...state,
                history: action.history
            }
        }
        case "LOG_OUT": {
            return {
                ...state,
                history: [],
                balance: null
            };
        }

        default:
            {
                return state;
            }
    }
};

export default walletReducer;