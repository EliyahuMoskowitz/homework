import './RecipeDetails.css';
import React, { useState, useEffect } from 'react';
import BulletLessList from './BulletLessList';
import { Link, useParams } from 'react-router-dom';

export default function RecipeDetails ({recipeArray}) {
  const [recipe, setRecipe] = useState(); 
  const [{imageShowing}, setImage] = useState({imageShowing: true});
  // let {imageShowing} = state;

  let {recipeId} = useParams();

  useEffect(() => {
    (async () => {
    try {
      const response = await fetch(`/data/${recipeId}.json`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const recipe = await response.json();
          //separate states for different variables
      setRecipe(recipe);
      // setState({       //if same state for all
      //   ...state,
      //   recipe: recipe
      // });
    } catch (err) {
      console.error(err);
    }
  })()
}, [recipeId]);

  const togglePicture = () => {
    setImage({
      imageShowing: !imageShowing
    });
  }

  function getPictureElem(picture, name) {
    /*return imageShowing ?
      <img className="img-fluid img-thumbnail img" src={picture} alt={name} /> :
      null;*/
    if (imageShowing) {
      return <img className="img-fluid img-thumbnail img" src={picture} alt={name} />
    }
    return null;
  }

    if (! recipe) {
      return null;
    }

    const { name, ingredients, directions, picture } = recipe;

    /*const pictureElem = imageShowing ?
      <img className="img-fluid img-thumbnail img" src={picture} alt={name} /> :
      null;*/

    const text = imageShowing ? 'hide' : 'show';

    return (
      <div>
        <h2>{name}</h2>
        {/*pictureElem*/getPictureElem(picture, name)}
        <br />
        <button onClick={togglePicture}>
          {text} picture
        </button>
        <h3>ingredients</h3>
        <BulletLessList list={ingredients} />
        <h3>directions</h3>
        <BulletLessList list={directions} />

        <p style={{color: 'purple', fontFamily: 'fantasy'}}>Navigate to other Recipes</p>
        {recipeArray.map(recipe => (
          <li className="bulletlessList" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          </li>))}
      </div>
    )
  }