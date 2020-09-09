import { createStore, combineReducers } from 'redux'
import HomeReducer from '../modules/Home/reducer-home'
import notifyReducer from '../modules/Notify/reducer-notify'
import walletReducer from '../modules/Wallet/reducer-wallet'

const reducers = combineReducers({
    home: HomeReducer,
    notify: notifyReducer,
    wallet: walletReducer
});

const store = createStore(reducers);
export default store