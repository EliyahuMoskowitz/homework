import React, { useState, useEffect } from 'react';
import Fetch from './Fetch';
import User from './User';

function Blogs({setUsers: setParentUsers}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //need set msg etc.... if want msgBox
        // <Fetch url='https://jsonplaceholder.typicode.com/users' setUsers={setUsers} /*setMsg={setMsg}*/ setParentUsers={setParentUsers} />
        Fetch('https://jsonplaceholder.typicode.com/users', setUsers, setParentUsers);
    }, [setParentUsers]);

        return (
            <>
                <h3 style={{textAlign: 'center', color: 'purple'}}>Welcome to Our Blogs</h3>
                <div id="blogDiv">
                    {users.map(u => <User key={u.id} user={u} />)}
                </div>
            </>
        );
    }


export default Blogs;