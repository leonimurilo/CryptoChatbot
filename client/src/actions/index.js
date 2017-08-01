import Axios from "axios";
import {SEND_MESSAGE, SHOW_USER_MESSAGE} from "./types";

export function sendMessage(message) {
    const requestPromise = Axios.post("/api/message", message);
    return {
        type: SEND_MESSAGE,
        payload: requestPromise
    }
}

export function showUserMessage(message){
    return {
        type: SHOW_USER_MESSAGE,
        payload: message
    }
}