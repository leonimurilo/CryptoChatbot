import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
        // call send message action passing the msg
        this.setState({message: ""})
    }

    render(){
        return (
            <div>
                <h3>MessageBox here</h3>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input placeholder="Type your message here"
                           value={this.state.message}
                           onChange={this.onInputChange.bind(this)}
                    />
                    <button type="submit" >Send</button>
                </form>
            </div>
        );
    }
}

export default ChatBox;