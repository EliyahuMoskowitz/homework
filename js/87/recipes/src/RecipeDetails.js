import './RecipeDetails.css';
import React, { Component } from 'react'
import BulletLessList from './BulletLessList';
import { withRouter, Link } from 'react-router-dom';

class RecipeDetails extends Component {
  state = {
    imageShowing: true
  };

  componentDidMount() {
    this.loadRecipe();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.recipeId !== this.props.match.params.recipeId) {
      this.loadRecipe();
    }
  }

  async loadRecipe() {
    const { match: { params: { recipeId } } } = this.props;
    try {
      const response = await fetch(`/data/${recipeId}.json`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const recipe = await response.json();
      this.setState({
        recipe: recipe
      });
    } catch (err) {
      console.error(err);
    }
  }



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
    if (!this.state.recipe) {
      return null;
    }

    const { name, ingredients, directions, picture } = this.state.recipe;

    /*const pictureElem = this.state.imageShowing ?
      <img className="img-fluid img-thumbnail img" src={picture} alt={name} /> :
      null;*/

    const text = this.state.imageShowing ? 'hide' : 'show';

    return (
      <div>
        <h2>{name}</h2>
        {/*pictureElem*/this.getPictureElem(picture, name)}
        <br />
        <button onClick={this.togglePicture}>
          {text} picture
        </button>
        <h3>ingredients</h3>
        <BulletLessList list={ingredients} />
        <h3>directions</h3>
        <BulletLessList list={directions} />

        <Link to='/recipe/1'>Recipe 1</Link>
      </div>
    )
  }
}

// component will now get match, location, history as props
export default withRouter(RecipeDetails)
