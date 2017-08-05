import {UPDATE_CONVERSATION_CONTEXT} from "../actions/types";

export default function(state = {}, action){
    switch(action.type){
        case UPDATE_CONVERSATION_CONTEXT:
            return state; // to be changed (update context using action.payload)
        default: return state;
    }
}