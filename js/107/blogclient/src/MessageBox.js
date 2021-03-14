import React from 'react';

function MessageBox({msg}){
    const msgBox = document.getElementById('msgBox');
    msgBox.style.display = 'block';

        return (
        <div id="msgBox">
            <section className="msg">{msg || 'msgBox Error Message'}</section>
            <button className="buttons" onClick={() => msgBox.style.display = 'none'}>OK</button>
        </div>
        );
    }

export default MessageBox;