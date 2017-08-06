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
            <div id="chat-box">
                <MessagesBox/>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input placeholder="Type your message here"
                                   value={this.state.message}
                                   className="input is-info"
                                   onChange={this.onInputChange.bind(this)}
                                   disabled={!this.props.allowInput}
                                   autoFocus
                                   ref={input => this.textInput = input}
                            />
                        </div>
                        <div className="control">
                            <button type="submit"
                                    className="button is-info is-outlined"
                                    disabled={!this.props.allowInput}>Send</button>
                        </div>

                    </div>
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