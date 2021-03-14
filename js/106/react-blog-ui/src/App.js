import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Blogs from './Blogs';
import Posts from './Posts';
// import Comments from './Comments';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Header from './Header';
// import MessageBox from './MessageBox';

function App() {
  // const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  // const [msg, setMsg] = useState('Error Message');

  // console.log('msg is ', msg);

  return (
    <div>
      <Header links={links}/>
      <Router>
        <Switch>
          {/* <Route path="/home" > */}
            {/* <Blogs setUsers={setUsers} /*setMsg={setMsg}/>*/}
          {/* </Route>  */}
        {/* <Route path="/posts/:userId" > */}
        <Route path="/" >
          <Posts setLinks={setLinks} /*users={users} /*setMsg={setMsg}*/ />
          {/* <Route path="/posts/:userId/:postId" >
            <Comments />
          </Route> */}
        </Route>
        {/* <Route path="/messagebox" >
          <MessageBox msg={msg} />
        </Route> */}
        <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
