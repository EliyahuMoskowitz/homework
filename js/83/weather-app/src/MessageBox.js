import React from 'react';
import './msgBox.css';

export default function MessageBox({ msg, closeBox }) {

    const state = {
        isBoxOpen: true
    }

    let msgBox = state.isBoxOpen ?
        <div className="msgBox">
            <span className="msg">{msg}</span>
            <section className="buttons"><button onClick={closeBox}>OK</button></section>
        </div> : null;

    return (
        <>
            {msgBox}
        </>
    );
}

