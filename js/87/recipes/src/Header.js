import React from 'react'
import {NavLink} from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>PCS Recipes</h1>
      <NavLink to='/recipes'>Recipe List</NavLink> | <NavLink to='/addrecipe'>Add Recipe</NavLink>
      <hr />
    </header>
  )
}
