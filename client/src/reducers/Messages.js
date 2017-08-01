import {SEND_MESSAGE} from "../actions/types";

export default function (state = {}, action) {
    switch(action.type){
        case SEND_MESSAGE:
            console.log(action.payload);
            return state;
        default: return state;
    }
}