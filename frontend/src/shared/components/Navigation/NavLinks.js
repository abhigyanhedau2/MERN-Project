import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Button from '../FormElements/Button';
import './NavLinks.css';

const NavLinks = () => {

    const authContext = useContext(AuthContext);

    return (
        <ul className='nav-links'>
            <li><NavLink end to='/'>ALL USERS</NavLink></li>
            {authContext.isLoggedIn && (<li><NavLink to={`/${authContext.userId}/places`}>MY PLACES</NavLink></li>)}
            {authContext.isLoggedIn && (<li><NavLink to='/places/new'>ADD PLACE</NavLink></li>)}
            {!authContext.isLoggedIn && (<li><NavLink to='/auth'>AUTHENTICATE</NavLink></li>)}
            {authContext.isLoggedIn && (<li><Button onClick={authContext.logout}>Logout</Button></li>)}
        </ul>
    )
};

export default NavLinks;