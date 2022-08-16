import React from 'react'
import './NavBar.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navigation-bar">
            <Link to="/">
                <div className="logo">Movie App</div>
            </Link>
            {/* <div className="user-image">
                <img src={user} alt="" />
            </div> */}
        </div>
    )
}

export default NavBar