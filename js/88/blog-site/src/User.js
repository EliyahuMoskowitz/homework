import React from 'react';
import {Link} from 'react-router-dom';

function User ({user: {name, id, website, company: { name: CName, catchPhrase: phrase, bs }}}) {

        return (
            <main className="aBlog" >
                <Link to={`/posts/${id}`} > <div className="text-center">{name}</div>
                <div className="text-center text-danger">{website}</div>
                <div className="text-center text-dark">Company: <br/>{CName}<br/>{phrase}<br/>{bs}</div></Link> 
            </main>
        );
    }


export default User;