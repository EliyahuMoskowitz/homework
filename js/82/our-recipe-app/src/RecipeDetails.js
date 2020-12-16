import './recipes.css';
import React from 'react';

export default function RecipeDetails(props) {
    return (
        <>
            <h1>RECIPE DETAILS</h1>
            <h2 id="recipeDetailsName">{props.recipe.name}</h2>
            <div id="instructions">{props.recipe.instructions}
                {console.log(typeof props.recipe.ingridients, props.recipe.ingridients)}
            </div>
            <div>{props.recipe.ingridients.forEach(ing => {
                return <span> {ing} </span>
            })}</div>

            {/* <div>{props.recipe.ingridients[0]}</div> */}
            <img src={props.recipe.logo} alt={props.recipe.name} />
        </>
    )

}