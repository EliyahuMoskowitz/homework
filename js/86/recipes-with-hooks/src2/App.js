import './App.css';
import React, { Component } from 'react';
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [{
        name: 'Pizza',
        id: 1,
        instructions: 'Heat oven to 450*` and Enjoy!!',
        ingridients: ['White Bread', 'Tomato Sauce', 'Water', 'Oregano'],
        logo: './images/pizza.jpg'
      },
      {
        name: 'Salmon',
        id: 2,
        instructions: 'Heat oven to 250*` for 2 1/2 hours and Enjoy with Mustard!!',
        ingridients: ['Alaskan Salmon', 'Duck Sauce', 'Wine', 'Garlic'],
        logo: './images/salmon.jpg'
      },
      {
        name: 'Burger',
        id: 3,
        instructions: 'Heat Grill to 350*` and Fry with Olive Oil and Enjoy with Spicy Mayo!!',
        ingridients: ["Beef", "Honey", "Onion", "BBQ Sauce"],
        logo: './images/burger.jpg'
      },
      {
        name: "Salad",
        id: 4,
        instructions: 'Heat Toaster to 175*` for 2 hours and Enjoy with Lemon Juice!!',
        ingridients: ["Romaine Lettuce", "Feta Cheese", "Croutons", "Kani"],
        logo: './images/salad.jpg'
      }],
      CurrentlySelectedRecipe: {
        id: null
      }
    }
  }
  changeSelectedRecipe = ({ target: { innerText: text } }) => {
    console.log(text);
    this.setState({
      CurrentlySelectedRecipe: {
        id: this.state.recipes.find(r => r.name === text).id
      }
    })
  };

  getRecipe() {
    return this.state.recipes.find(r => r.id === this.state.CurrentlySelectedRecipe.id);
  }

  render() {
    return (
      <div className="App">

        <section id="sectionRecipes">
          <aside id="side">
            <h2 id="chooseList">Please Choose from a List of Recipes</h2>
            {this.state.recipes.map(r => <Recipe recipeName={r.name} key={r.id} clickHandler={this.changeSelectedRecipe} />)}
          </aside>

          <main id="mainDetails">
            {this.state.CurrentlySelectedRecipe.id ? <RecipeDetails recipe={this.getRecipe()} /> : null}

          </main>
        </section>
      </div>
    );
  }

}

export default App;
