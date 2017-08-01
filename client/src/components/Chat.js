import React, {Component} from "react";
import {Link} from "react-router-dom";
import ChatBox from "../components/ChatBox";


export default function(props) {
    return (
        <div>
            <Link to="/">Home page</Link>
            <ChatBox/>
        </div>
    );
}