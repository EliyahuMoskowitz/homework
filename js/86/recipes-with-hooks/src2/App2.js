import './App.css';
import React,  {useState} from 'react';

function App() {

  const recipes = [{
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
  },
  {
    name: 'Burger',
    id: 3,
    instructions: 'Heat Grill to 350*` and Fry with Olive Oil and Enjoy with Spicy Mayo!!',
    ingridients: ["Beef", "Honey", "Onion", "BBQ Sauce"],
    logo: './images/burger.jpg'
    // logo: "https://i2.wp.com/www.foodrepublic.com/wp-content/uploads/2011/03/basicburger.jpg"
  },
  {
    name: "Salad",
    id: 4,
    instructions: 'Heat Toaster to 175*` for 2 hours and Enjoy with Lemon Juice!!',
    ingridients: ["Romaine Lettuce", "Feta Cheese", "Croutons", "Kani"],
    logo: './images/salad.jpg'
    // logo: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Feta-Romaine-Salad_exps37614_SD2847494A02_12_9bC_RMS-696x696.jpg"
  }];
  let currentlySelectedRecipe = {
    id: null
  };

  let ourState = {recipes: recipes, currentlySelectedRecipe: currentlySelectedRecipe};

  const [state, setState] = useState(ourState);

// }
// changeSelectedRecipe = ({ target: { innerText: text } }) => {
// console.log(text);
// this.setState({
//   CurrentlySelectedRecipe: {
//     id: this.state.recipes.find(r => r.name === text).id
//   }
// })
// };

// getRecipe() {
// return this.state.recipes.find(r => r.id === this.state.CurrentlySelectedRecipe.id);
// }



  return (
    <div className="App">

    <section id="sectionRecipes">
      <aside id="side">
        <h2 id="chooseList">Please Choose from a List of Recipes</h2>
        {this.state.recipes.map(r => <Recipe recipeName={r.name} key={r.id} clickHandler={this.changeSelectedRecipe} />)}
        {/* <Recipe /> */}
      </aside>

      {/* <RecipeDetails recipe={this.state.recipes.find(r => r.id === this.state.CurrentlySelectedRecipe.id)} /> */}
      <main id="mainDetails">
        {this.state.CurrentlySelectedRecipe.id ? <RecipeDetails recipe={this.getRecipe()} /> : null}

        {/* <RecipeDetails recipe={this.getRecipe()} /> */}
      </main>
    </section>
  </div>
);
}

export default App;