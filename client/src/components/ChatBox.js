import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendMessage} from "../actions/index"

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
        this.props.sendMessage(this.state.message);
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({sendMessage}, dispatch);
}

export default connect(null, mapDispatchToProps)(ChatBox);