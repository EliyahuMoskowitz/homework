import './recipes.css';
import React from 'react';

export default function RecipeDetails(props) {
    const { name, instructions, ingridients, logo } = props.recipe;

    return (
        <>
            <h1>RECIPE DETAILS</h1>
            <h2 id="recipeDetailsName">{name}</h2>
            <div id="instructions">{instructions}
                {console.log(typeof ingridients, ingridients)}
            </div>
            <div id="ingridients">{ingridients.map((ing, index) => <span key={index}> {ing} </span>)}</div>

            {/* <div>{ingridients[0]}</div> */}
            <img src={logo} alt={name} />
        </>
    )

}