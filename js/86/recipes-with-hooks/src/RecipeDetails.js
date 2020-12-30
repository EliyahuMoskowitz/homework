import './RecipeDetails.css';
import React, { useState } from 'react'
import BulletLessList from './BulletLessList';

export default function RecipeDetails(props) {
  
  const [state, setState] = useState({imageShowing: true});
  let {imageShowing} = state;

  let togglePicture = () => {
    setState({ ...state, 
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

    const { name, ingredients, directions, picture } = props.recipe;

    /*const pictureElem = imageShowing ?
      <img className="img-fluid img-thumbnail img" src={picture} alt={name} /> :
      null;*/

    const text = imageShowing ? 'hide' : 'show';

    return (
      <div>
        <h2>{name}</h2>
        {/*pictureElem*/getPictureElem(picture, name)}
        <br/>
        <button onClick={togglePicture}>
          {text} picture
        </button>
        <h3>ingredients</h3>
        <BulletLessList list={ingredients} />
        <h3>directions</h3>
        <BulletLessList list={directions} />
      </div>
    )
  }

