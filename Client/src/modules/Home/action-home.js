export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        user
    }
}

export const logout=()=>{
	return{
		type:'LOG_OUT'
	}
    
}

export const pending=(state)=>{
	return{
        type:'PENDING',
        state
	}
    
}