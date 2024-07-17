import React from 'react';
import {NavLink} from "react-router-dom"

const LeftNav = () => {
    return (
        <div>
            <NavLink to="/" activeClassName="active-left-nav">
                <img src='./img/icons/home.svg' alt='home icon' />
            </NavLink> <br />
            <NavLink to="/trending" activeClassName="active-left-nav">
                <img src='./img/icons/rocket.svg' alt='home icon' />
            </NavLink> <br />
            <NavLink to="/profil" activeClassName="active-left-nav">
                <img src='./img/icons/user.svg' alt='home icon' />
            </NavLink>
        </div>
    );
};

export default LeftNav;