// Sign-up component for new users

import { useState, FormEvent } from 'react';

import Sidebar from './Sidebar';

const SignUp = () => {
  const [body, setBody] = useState({
    first_name: '',
    family_name: '',
    username: '',
    password: '',
    confirm_password: ''
  });

  const handleInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    switch (target.id) {
      case 'first_name':
        console.log(target.value);
        break;
      case 'family_name':
        console.log(target.value);
        break;
      case 'username':
        console.log(target.value);
        break;
      case 'password':
        console.log(target.value);
        break;
      case 'confirm_password':
        console.log(target.value);
        break;
      default:
        console.log('Not sure how you ended up here.');
        break;
    };
  };

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 items-center">
        <form className="flex flex-col items-center gap-7" onChange={(e) => handleInput(e)}>
          <div className="grid grid-cols-[100px_auto] gap-5 items-center">
            <label className="justify-self-end">Username</label>
            <input
              type="text"
              id='username'
              autoComplete="username"
              className="form-input"
            />
            <label className="justify-self-end">Password</label>
            <input
              type="password"
              id='password'
              autoComplete="current-password"
              className="form-input"
            />
          </div>
          <button className="btn">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
