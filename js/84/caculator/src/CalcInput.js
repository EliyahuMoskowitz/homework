import React from 'react';

export default function CalcInput(props) {

    return (
        // <input onBlur={({ target: t }) => props.onBlurHandler(t.value)} />
        <input onBlur={e => props.onBlurHandler(e.target.value)} />
    );
};
