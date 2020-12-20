import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';
// import pizzaImg from './images/pizza.jpg';
// import salmonImg from './images/salmon.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [{
        name: 'Pizza',
        id: 1,
        instructions: 'Heat oven to 450*` and Enjoy!!',
        ingridients: ['White Bread', 'Tomato Sauce', 'Water', 'Oregano'],
        // logo: 'https://feelingfoodish.com/wp-content/uploads/2012/08/New-York-Style-pizza.jpg'
        logo: './images/pizza.jpg'
        // logo: pizzaImg
      },
      {
        name: 'Salmon',
        id: 2,
        instructions: 'Heat oven to 250*` for 2 1/2 hours and Enjoy with Mustard!!',
        ingridients: ['Alaskan Salmon', 'Duck Sauce', 'Wine', 'Garlic'],
        // logo: 'https://www.foodiecrush.com/wp-content/uploads/2019/05/Grilled-Salmon-foodiecrush.com-023-683x1024.jpg'
        logo: './images/salmon.jpg'
        // logo: salmonImg
      }],
      CurrentlySelectedRecipe: {
        id: 1
      }
    }
  }
  // changeState = e => {
  //   console.log(e, e.target);
  //   this.setState({
  //     CurrentlySelectedRecipe: {
  //       id: this.state.recipes.find(r => r.name === e.taregt.innerText).id
  //     }
  //   })
  // };

  getRecipe() {
    return this.state.recipes.find(r => r.id === this.state.CurrentlySelectedRecipe.id);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit or Change <code>src/App.js</code> and then save in order to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click Here to Learn React
          </a>
        </header>
        <h2 id="chooseList">Please Choose from a List of Recipes</h2>
        {this.state.recipes.map(r => <Recipe recipeName={r.name} key={r.id} /*onClick={this.changeState.bind(this)}*/ />)}
        {/* <Recipe /> */}

        {/* <RecipeDetails recipe={this.state.recipes.find(r => r.id === this.state.CurrentlySelectedRecipe.id)} /> */}

        {/* {this.state.CurrentlySelectedRecipe.id > 0 ? <RecipeDetails recipe={this.getRecipe()} /> : null} */}

        <RecipeDetails recipe={this.getRecipe()} />

      </div>
    );
  }

}

export default App;
