import './recipes.css';
import React from 'react';

export default function Recipe(props) {
    return (
        <>
            <div id="recipeName">{props.recipeName}</div>
        </>
    )
}