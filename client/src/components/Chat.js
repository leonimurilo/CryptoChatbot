import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
// import {sendMessage} from "../actions";


class Chat extends Component{
    render(){
        return (
            <div>
                <Link to="/">Home page</Link>
                <h2>Chat</h2>
            </div>
        );
    }
}

export default connect(null, null)(Chat);