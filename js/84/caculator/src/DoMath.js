import React from 'react';

export default function Math({ display, clickHandler }) {

    return (
        <button onClick={() => clickHandler(display)} >{display}</button>
    );
};