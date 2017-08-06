import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendMessage} from "../actions/index"
import MessagesBox from "./MessagesBox";

class ChatBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: ""
        };
    }

    onInputChange(event){
        this.setState({message: event.target.value})
    }

    onFormSubmit(event){
        event.preventDefault();
        if(this.props.allowInput){
            this.props.sendMessage(this.state.message, this.props.context);
            this.setState({message: ""});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allowInput) {
            this.textInput.focus();
        }
    }

    render(){
        return (
            <div>
                <MessagesBox/>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input placeholder="Type your message here"
                           value={this.state.message}
                           onChange={this.onInputChange.bind(this)}
                           disabled={!this.props.allowInput}
                           autoFocus
                           ref={input => this.textInput = input}
                    />
                    <button type="submit" disabled={!this.props.allowInput}>Send</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendMessage}, dispatch);
}

function mapStateToProps({conversationContext, allowInput}){
    return {
        context: conversationContext,
        allowInput
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);