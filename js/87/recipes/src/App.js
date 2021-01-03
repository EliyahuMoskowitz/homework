import './App.css';
import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';
// import BulletLessList from './BulletLessList';
import ClickCounter from './ClickCounter';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header';

export default class App extends Component {
  state = {
    recipes: [
      {
        id: 1,
        name: 'hard boiled eggs',
        ingredients: ['eggs', 'water', 'salt'],
        directions: ['boil water', 'add eggs', 'salt to taste'],
        picture: 'https://hips.hearstapps.com/delish/assets/18/08/1519321899-hard-boiled-eggs-horizontal.jpg'
      },
      {
        id: 2,
        name: 'steak',
        ingredients: ['steak', 'barbeque sauce'],
        directions: ['marinate steak', 'grill for 8 minutes'],
        picture: 'https://www.omahasteaks.com/gifs/990x594/prfm7a.jpg'
      }
    ]
  };

  getRecipeDetails(match) {
      const selectedRecipe = this.state.recipes.find(r => r.id === +match.params.recipeId);
      return selectedRecipe ? <RecipeDetails recipe={selectedRecipe} recipeArray={this.state.recipes} /> :
                              <h3>select one of our delicious recipes!</h3>;
  }

  render() {
    //const recipeDetails = this.state.selectedRecipe ? <RecipeDetails recipe={this.state.selectedRecipe} /> : <h3>select one of our delicious recipes!</h3>;

    return (
      <div className="container text-center">
        <Header />
        <Switch>
          <Route path="/recipes">
            <RecipeList recipes={this.state.recipes}/>
          </Route>
          <Route path="/recipe/:recipeId" render={({match}) => this.getRecipeDetails(match)}/>
          <Route path="/addrecipe">
            <AddRecipe recipeArray={this.state.recipes}/>
          </Route>
          <Redirect to="/recipes" />
        </Switch>
        <hr />
        <ClickCounter />
      </div>
    );
  }
}