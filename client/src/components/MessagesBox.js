import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";

class MessagesBox extends Component{
    constructor(props){
        super(props);
    }

    renderMessages(messages){
        return _.map(messages, (message, index) => {
            return (
                <li key={index}>
                    {message.content}
                </li>
            );
        });
    }

    render(){
        return (
            <div id="message-box">
                <ul>
                    {this.renderMessages(this.props.messages)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}


export default connect(mapStateToProps, null)(MessagesBox);