import './App.css';
import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails3';
// import BulletLessList from './BulletLessList';
import ClickCounter from './ClickCounter';
import RecipeList from './RecipeList3';
import AddRecipe from './AddRecipe';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header';

export default class App extends Component {

  state = {recipes: []};

  setAppRecipes = recipes => {
    this.setState({recipes: recipes})
  };

  render() {
    return (
      <div className="container text-center">
        <Header />
        <Switch>
          <Route path="/recipes">
            <RecipeList setAppRecipes={this.setAppRecipes} />
          </Route>
          {/*<Route path="/recipe/:recipeId" render={({ match }) => <RecipeDetails match={match} />} />*/}
          <Route path="/recipe/:recipeId">
            <RecipeDetails recipeArray={this.state.recipes} />
          </Route>
          <Route path="/addrecipe">
            <AddRecipe />
          </Route>
          <Redirect to="/recipes" />
        </Switch>
        <hr />
        <ClickCounter />
      </div>
    );
  }
}