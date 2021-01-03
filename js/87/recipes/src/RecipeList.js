import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

export default function RecipeList(props) {
  return (
    <ul className="bulletlessList">
      {props.recipes.map(r => (
        <li key={r.id}>
          <Link to={`/recipe/${r.id}`}>{r.name}</Link>
        </li>))}
    </ul >
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
}


