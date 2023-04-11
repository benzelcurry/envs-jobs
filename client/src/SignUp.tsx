// Sign-up component for new users

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';

const SignUp = () => {
  const [error, setError] = useState('');
  const [body, setBody] = useState({
    first_name: '',
    family_name: '',
    username: '',
    password: '',
    confirm_password: ''
  });

  const navigate = useNavigate();

  // Updates `body` state object upon form input
  const handleInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    switch (target.id) {
      case 'first_name':
        setBody({ ...body, first_name: target.value });
        break;
      case 'family_name':
        setBody({ ...body, family_name: target.value });
        break;
      case 'username':
        setBody({ ...body, username: target.value });
        break;
      case 'password':
        setBody({ ...body, password: target.value });
        break;
      case 'confirm_password':
        setBody({ ...body, confirm_password: target.value });
        break;
      default:
        throw new Error('Not sure how you ended up here!');
    }
  };

  // Sends `body` to back end to create new User
  // MAKE THIS LOG USER IN AUTOMATICALLY AND THEN REDIRECT TO HOME PAGE
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post('/api/users', body)
      .then((response) => {
        console.log(response);
        axios
          .post('/api/users/login', { username: body.username, password: body.password })
          .then((response) => {
            console.log(response);
            if (response.data.message === 'Successful') {
              window.localStorage.setItem('token', response.data.token);
              navigate('/');
            };
          })
          .catch((error) => {
            setError(error.response.data.errors[0]);
          });
      })
      .catch((error) => {
        setError(error.response.data.errors[0]);
      });
  };

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 items-center">
        <form
          className="flex flex-col items-center gap-7"
          onChange={(e) => handleInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-[150px_auto] gap-5 items-center">
            <label className="justify-self-end">First Name</label>
            <input
              aria-label="First name"
              type="text"
              id="first_name"
              autoComplete="given-name"
              className="form-input"
            />
            <label className="justify-self-end">Family Name</label>
            <input
              aria-label="Family name"
              type="text"
              id="family_name"
              autoComplete="family-name"
              className="form-input"
            />
            <label className="justify-self-end">Username</label>
            <input
              aria-label="Username"
              type="text"
              id="username"
              autoComplete="username"
              className="form-input"
            />
            <label className="justify-self-end">Password</label>
            <input
              aria-label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              className="form-input"
            />
            <label className="justify-self-end">Confirm Password</label>
            <input
              aria-label="Confirm password"
              type="password"
              id="confirm_password"
              autoComplete="new-password"
              className="form-input"
            />
          </div>
          <button aria-label="Create account" className="btn">
            Create Account
          </button>
          {error ? <p className="text-red-500">{error}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
