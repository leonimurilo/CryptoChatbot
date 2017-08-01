import {SEND_MESSAGE, SHOW_USER_MESSAGE} from "../actions/types";
import _ from "lodash";

export default function (state = [], action) {
    switch(action.type){
        case SEND_MESSAGE: {
            let newState = _.map(state, _.clone);
            newState.push({
                user: false,
                content: action.payload.data
            });
            console.log(action.payload, "payload");
            console.log(newState, "new state");
            return newState;
        }

        case SHOW_USER_MESSAGE: {
            let newState = _.map(state, _.clone);
            newState.push({
                user: true,
                content: action.payload
            });
            console.log(action.payload, "payload");
            console.log(newState, "new state");
            return newState;
        }

        default: return state;
    }
}