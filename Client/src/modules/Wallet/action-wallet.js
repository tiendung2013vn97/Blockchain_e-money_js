export const updateBalance = (balance) => {
    return {
        type: 'UPDATE_BALANCE',
        balance
    }
}

export const updateHistory = (history) => {
    return {
        type: 'UPDATE_HISTORY',
        history
    }
}
