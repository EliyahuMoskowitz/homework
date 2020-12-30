import './RecipeDetails.css';
import React, { Component } from 'react'
import BulletLessList from './BulletLessList';

export default class RecipeDetails extends Component {
  state = {
    imageShowing: true
  };

  togglePicture = () => {
    this.setState({
      imageShowing: !this.state.imageShowing
    });
  }

  getPictureElem(picture, name) {
    /*return this.state.imageShowing ?
      <img className="img-fluid img-thumbnail img" src={picture} alt={name} /> :
      null;*/
      if (this.state.imageShowing) {
        return <img className="img-fluid img-thumbnail img" src={picture} alt={name} />
      }
      return null;
  }

  render() {
    const { name, ingredients, directions, picture } = this.props.recipe;

    /*const pictureElem = this.state.imageShowing ?
      <img className="img-fluid img-thumbnail img" src={picture} alt={name} /> :
      null;*/

    const text = this.state.imageShowing ? 'hide' : 'show';

    return (
      <div>
        <h2>{name}</h2>
        {/*pictureElem*/this.getPictureElem(picture, name)}
        <br/>
        <button onClick={this.togglePicture}>
          {text} picture
        </button>
        <h3>ingredients</h3>
        <BulletLessList list={ingredients} />
        <h3>directions</h3>
        <BulletLessList list={directions} />
      </div>
    )
  }
}
