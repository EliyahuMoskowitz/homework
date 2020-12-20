import './recipes.css';
import React from 'react';

export default function Recipe(props) {
    const { recipeName: name/*, click*/ } = props;
    return (
        <>
            <div id="recipeName"><button /*onClick={click}*/>{name}</button></div>
        </>
    )
}