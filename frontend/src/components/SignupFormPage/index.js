import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfileUpload from '../ProfileUpload'
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
  const hidden = (errors.length) ? '' : 'hidden'
  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <ProfileUpload setter={setImgUrl} value={imgUrl} defaultValue='http://simpleicon.com/wp-content/uploads/user1.png'/>
        <ul className={hidden+' no-label-list'}>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='label-box'>
          <label>
            Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='label-box'>
          <label>
            Username
        </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='label-box'>
          <label>
            Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='label-box'>
          <label>
            Confirm Password
        </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className='login-button' id='login-modal-button' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
