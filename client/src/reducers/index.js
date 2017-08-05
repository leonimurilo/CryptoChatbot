import { combineReducers } from 'redux';
import MessagesReducer from "./Messages";
import ConversationContextReducer from "./ConversationContext";

const rootReducer = combineReducers({
    messages: MessagesReducer,
    conversationContext: ConversationContextReducer
});

export default rootReducer;