import { createStore, combineReducers } from 'redux'
import HomeReducer from '../modules/Home/reducer-home'
import notifyReducer from '../modules/Notify/reducer-notify'
import voteReducer from '../modules/Vote/reducer-vote'

const reducers = combineReducers({
    home: HomeReducer,
    notify: notifyReducer,
    vote: voteReducer
});

const store = createStore(reducers);
export default store