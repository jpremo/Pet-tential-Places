import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom'
import './Navigation.css';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <div id='profile-box'>
      <button className='bar-button' onClick={openMenu}>
        <i class="fas fa-bars fa-2x"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li id="user-name">{user.username}</li>
          <li>
            <NavLink to='/profile' id='profile-link'>My Profile</NavLink>
          </li>
          <li>
            <button className='login-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
