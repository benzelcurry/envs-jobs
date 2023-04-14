// Log-in component for existing users
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';

const LogIn = () => {
  const [error, setError] = useState('');
  const [body, setBody] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setBody({
      ...body,
      username: e.target.value
    });
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setBody({
      ...body,
      password: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post('/api/users/login', body)
      .then((response) => {
        if (response.data.message === 'Successful') {
          window.localStorage.setItem('token', response.data.token);
          navigate('/');
          navigate(0);
        } else {
          setError(response.data.errors);
        }
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center gap-7"
        >
          <div className="grid grid-cols-[100px_auto] gap-5 items-center">
            <label className="justify-self-end">Username</label>
            <input
              aria-label="Username"
              type="text"
              onChange={(e) => handleUsername(e)}
              autoComplete="username"
              className="form-input"
            />
            <label className="justify-self-end">Password</label>
            <input
              aria-label="Password"
              type="password"
              onChange={(e) => handlePassword(e)}
              autoComplete="current-password"
              className="form-input"
            />
          </div>
          <button aria-label="Log in" className="btn">
            Log In
          </button>
          {error ? <p className="text-red-500">{error}</p> : null}
        </form>
        <p className="mt-10">
          New user?{' '}
          <Link
            aria-label="Sign up"
            to={'/sign-up'}
            className="italic underline text-green-500 hover:text-green-300"
          >
            Click here to sign up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
