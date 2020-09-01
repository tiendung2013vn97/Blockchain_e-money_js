const init = {
    typeNotify: null,
    msg: ''
  }
  
  const notifyReducer = (state = init, action) => {
    switch (action.type) {
      case 'NOTIFY_ALERT':
        {
          return {
            ...state,
            typeNotify: 'alert',
            msg: action.msg
          }
        }
      case 'NOTIFY_SUCCESS':
        {
          return {
            ...state,
            typeNotify: 'success',
            msg: action.msg
          }
        }
        case 'NOTIFY_FAIL':
        {
          return {
            ...state,
            typeNotify: 'fail',
            msg: action.msg
          }
        }
      case 'CLOSE_NOTIFY':
        {
          return {
            ...state,
            msg: '',
            typeNotify: null
          }
        }
      default:
        {
          return state;          
        }
    }
  };
  
  export default notifyReducer;