import React, { useState } from 'react';

export default function AddRecipe ({recipeArray}    /* for adding to state, not Ajax */) {

    let [ values, setInputs] = useState({name: '', ingredients: '', directions: '', picture: '', id: ''});
    let {name, ingredients, directions, picture} = values;

    function setChangedInput(value, name){
        if(name === 'ingredients' || 'directions'){
            value = value.split(',');
        }
        setInputs({...values, [name]: value });
    }

    //to add to actual state
    function addRecipe(e){
        e.preventDefault();
        console.log(e);
        
        recipeArray.push({...values, id: recipeArray.length + 1});
    }

        return (
            <div>
                Add Recipe
                 <form onSubmit={e => addRecipe(e) }>
                {/* <form onSubmit={e => e.preventDefault()}> */}
                    <input placeholder="Name" name="name" value={name} required
                        onChange={({target: {value, name}}) => setChangedInput(value, name)} />
                        {/* onChange={({target: {value}}) => setInputs({...values, name: value})} /> */}

                    <input placeholder="Ingredients (csv)" name="ingredients" value={ingredients} required
                        onChange={({target: {value, name}}) => setChangedInput(value, name)} />
                        {/* onChange={({target: {value}}) => setInputs({...values, ingredients: value})} /> */}

                    <input placeholder="Directions (csv)" name="directions" value={directions} required
                        onChange={({target: {value, name}}) => setChangedInput(value, name)} />
                        {/* onChange={({target: {value}}) => setInputs({...values, directions: value})} /> */}

                    <input placeholder="Picture (URL)" name="picture" value={picture} 
                        onChange={({target: {value, name}}) => setChangedInput(value, name)} />
                        {/* onChange={({target: {value}}) => setInputs({...values, picture: value})} /> */}

                    <button>Add Recipe</button>
                </form>
            </div>
        );
}
