import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class RecipeList extends Component {
  state = { recipes: []};

  async componentDidMount() {
    try {
      const response = await fetch('/data/recipes.json');
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const recipes = await response.json();
      this.setState({
        recipes: recipes
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <ul className="bulletlessList">
        {this.state.recipes.map(r => (
          <li key={r.id}>
            <Link to={`/recipe/${r.id}`}>{r.name}</Link>
          </li>))}
      </ul >
    )
  }
}
