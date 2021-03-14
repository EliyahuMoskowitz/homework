import './Header.css';
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({userName /*login*/}) {
  let [loggedIn, setLoggedIn] = useState(false);
  let log = !loggedIn ? <NavLink onClick={() => setLoggedIn(true)} to="/log">register or log-in</NavLink>: <NavLink to="/" onClick={() => {fetch('http://localhost/logout'); setLoggedIn(false); userName = null;}} >logout</NavLink>;

  // login = setLoggedIn;

  return (
    <header>
      <h1>PCS MERN Blog</h1>
      <h2>Welcome to the Blog {userName} !</h2>
      <nav>
        <NavLink to="/">home</NavLink> | <NavLink to="/addPost">add post</NavLink> | 
            {log}
      </nav>
    </header>
  )
}
