import React from 'react';
import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

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
      <>
        <LoginFormModal setShowModal={setShowModal} showModal={showModal} />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='no-bullet-list'>
      <li>
        <NavLink exact to="/">Home</NavLink>
        <i className="fas fa-search" onClick={searchClick}></i>
        <input value={searchBusiness} placeholder='Business' onChange={(e) => setSearchBusiness(e.target.value)} onKeyUp={search} />
        <input value={searchLocation} placeholder='Location' onChange={(e) => setSearchLocation(e.target.value)} onKeyUp={search} />
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
