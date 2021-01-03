import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
export default ({setAppRecipes}) => {
  const [recipes, setRecipes]  = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/data/recipes.json');
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const recipes = await response.json();
        setRecipes(recipes);
        setAppRecipes(recipes);
      } catch (err) {
        console.error(err);
      }
    })();
  },[setAppRecipes]);

  return (
    <ul className="bulletlessList">
      {recipes.map(r => (
        <li key={r.id}>
          <Link to={`/recipe/${r.id}`}>{r.name}</Link>
        </li>))}
    </ul >
  )
}
