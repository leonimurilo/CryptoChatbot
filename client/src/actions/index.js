import Axios from "axios";
import {SEND_MESSAGE, SHOW_USER_MESSAGE} from "./types";

export function sendMessage(message) {
    const requestPromise = Axios.post("/api/message", message);

    // Redxu Thunk allows returning functions
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
                    payload: data
                }
            );
        }).catch(err => {
            console.log(err);
        });
    }
}