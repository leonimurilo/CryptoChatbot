import React from "react";
import {Link} from "react-router-dom";

export default function (props) {
    return (
        <div>
            <h3>Landing page</h3>
            <Link to="/chat">Go to chat</Link>
        </div>
    );
}