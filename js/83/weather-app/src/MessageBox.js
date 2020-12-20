import React, { Component } from 'react';
import './msgBox.css';

export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        let { msg } = this.props;

        this.state = {
            isBoxOpen: true
            // msg: msg
        }



        this.msgBox = /*msg*/this.state.isBoxOpen ?
            <div className="msgBox">
                <span className="msg">{msg}</span>
                <section className="buttons"><button onClick={this.closeBox}>OK</button></section>
            </div> : null;
    }

    closeBox = () => {
        this.setState({
            isBoxOpen: false
            // msg: null
        })
    }

    render() {
        return (
            <>
                {this.msgBox}
            </>
        );
    }
}
