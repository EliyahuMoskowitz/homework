import React from 'react';
// import PropTypes from 'prop-types';

function Header(props) {
    
        return (
            <>
                <header>
                    <h1>Welcome to the PCS MERN Blog!!</h1>
                    {props.links.map((l, index) => {
                        return <a href={l.href} key={index} >{l.text}</a> ;
                    })}
                </header>
            </>
        );
    }

// Header.propTypes = {// };

export default Header;