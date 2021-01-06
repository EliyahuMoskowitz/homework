import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Blogs';
import Posts from './Posts';
// import Comments from './Comments';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
// import MessageBox from './MessageBox';

function App() {
  const [users, setUsers] = useState([]);
  // const [msg, setMsg] = useState('Error Message');

  // console.log('msg is ', msg);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home" >
            <Home setUsers={setUsers} /*setMsg={setMsg}*/ />
          </Route>
        <Route path="/posts/:userId" >
          <Posts users={users} /*setMsg={setMsg}*/ />
          {/* <Route path="/posts/:userId/:postId" >
            <Comments />
          </Route> */}
        </Route>
        {/* <Route path="/messagebox" >
          <MessageBox msg={msg} />
        </Route> */}
        <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
