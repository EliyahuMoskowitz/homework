import React from 'react';
import { Link } from 'react-router-dom';
import './msgBox.css';

export default function MessageBox({ msg}) {

    return (
        <div className="msgBox">
            <span className="msg">{msg || 'msgBox Error Message'}</span>
            <section className="buttons"><Link to="/" >OK</Link></section>
        </div>
    );
}

