import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault()
    setCredential('demo_user')
    setPassword('demoUserPass')
  }

  const hidden = (errors.length) ? '' : 'hidden'

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
      <h1>Log In</h1>
        <ul className={hidden + ' no-label-list'}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='label-box'>
          <label>
            Username/Email
        </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
      <button className='login-button' id='login-modal-button' type="submit">Log In</button>
      <button className='login-button' id='login-modal-button' type="submit" onClick={demoLogin}>Demo Log In</button>
    </form>
    </>
  );
}

export default LoginForm;
