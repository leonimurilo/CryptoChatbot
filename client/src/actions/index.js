import Axios from "axios";
import {SEND_MESSAGE, SHOW_USER_MESSAGE, UPDATE_CONVERSATION_CONTEXT} from "./types";

export function sendMessage(message, context) {
    const requestPromise = Axios.post("/api/message",
        {
            message,
            context
        });

    // Redux Thunk allows returning functions
    return (dispatch) => {
        dispatch(
            {
                type: SHOW_USER_MESSAGE,
                payload: message
            }
        );

        requestPromise.then(({data}) => {
            // console.log(data);
            dispatch(
                {
                    type: SEND_MESSAGE,
                    payload: data.output
                }
            );

            dispatch(
                {
                    type: UPDATE_CONVERSATION_CONTEXT,
                    payload: data.context
                }
            );
        }).catch(err => {
            console.log(err);
        });
    }
}
