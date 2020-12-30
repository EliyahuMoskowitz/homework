import './recipes.css';
import React from 'react';

export default function Recipe(props) {
    const { recipeName: name, clickHandler } = props;
    return (
        <>
            <div><button id="recipeName" onClick={clickHandler}>{name}</button></div>
        </>
    );
}