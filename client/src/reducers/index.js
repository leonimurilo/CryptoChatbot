import { combineReducers } from 'redux';
import MessagesReducer from "./Messages";

const rootReducer = combineReducers({
    messages: MessagesReducer
});

export default rootReducer;