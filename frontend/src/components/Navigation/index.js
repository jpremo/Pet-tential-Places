import React from 'react';
import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../images/logo.png'

function Navigation({ isLoaded, setShowModal, showModal }) {
  const sessionUser = useSelector(state => state.session.user);
  const [searchBusiness, setSearchBusiness] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const history = useHistory()
  const search = (event) => {
    if (event.keyCode === 13) {
      history.push(`/search/?business=${searchBusiness}&location=${searchLocation}`)
    }
  }

  const searchClick = (event) => {
    history.push(`/search/?business=${searchBusiness}&location=${searchLocation}`)
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        <LoginFormModal setShowModal={setShowModal} showModal={showModal} />
        <NavLink className='login-button' to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <>
    <div id='navbar'>
      <NavLink exact to="/"><img id='logo' src={logo}/></NavLink>
      <div id='search-bars'>
        <i id='search-icon' className="fas fa-search" onClick={searchClick}></i>
        <input className='search-bar' value={searchBusiness} placeholder='Business: Ex. Kitty Pizzeria' onChange={(e) => setSearchBusiness(e.target.value)} onKeyUp={search} />
        <input className='search-bar' value={searchLocation} placeholder='Location: Ex. Baltimore' onChange={(e) => setSearchLocation(e.target.value)} onKeyUp={search} />
      </div>
      {isLoaded && sessionLinks}
    </div>
    <div id='navbar-spacer'></div>
    </>
  );
}

export default Navigation;
