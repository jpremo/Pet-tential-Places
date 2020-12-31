import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded, setShowModal, showModal  }){
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal  setShowModal={setShowModal} showModal={showModal}/>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='no-bullet-list'>
      <li>
        <NavLink exact to="/">Home</NavLink>
        <input placeholder='business'/>
        <input placeholder='location'/>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
