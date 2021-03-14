import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {useState} from 'react';
import Header from './Header';
import Posts from './Posts';
import AddPost from './AddPost';
import PageNotFound from './PageNotFound';
import Log from './Log';

// function login(setLoggedIn){
//   setLoggedIn(true);
// }
// let login;

function App() {
  let [userName, setUserName] = useState();
  return (
    <BrowserRouter>
    <Header userName={userName} />  {/*login={login}*/}
      <Switch>
        <Route path="/" exact>
          <Posts />
        </Route>
        <Route path="/addPost">
          <AddPost />
        </Route>
        <Route path="/log">
          <Log  setUserName={setUserName} />    {/*login={login}*/}
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
