import Axios from "axios";
import {SEND_MESSAGE} from "./types";

export function sendMessage(comment) {
    const requestPromise = Axios.post("/api/message");
    return {
        type: SEND_MESSAGE,
        payload: requestPromise
    }
}