import { combineReducers } from 'redux';
import MessagesReducer from "./Messages";
import ConversationContextReducer from "./ConversationContext";
import InputControlReducer from "./InputControl";

const rootReducer = combineReducers({
    messages: MessagesReducer,
    conversationContext: ConversationContextReducer,
    allowInput: InputControlReducer
});

export default rootReducer;