export const showAlertNotify=(msg)=>{
    return {
      type:'NOTIFY_ALERT',
      msg:msg
    }
  }
  
  export const showSuccessNotify=(msg)=>{
    return {
      type:'NOTIFY_SUCCESS',
      msg:msg
    }
  }
  
  export const showFailNotify=(msg)=>{
    return {
      type:'NOTIFY_FAIL',
      msg:msg
    }
  }
  
  export const closeNotify=()=>{
    return{
      type:'CLOSE_NOTIFY'
    }
  }