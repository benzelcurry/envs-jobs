// Log-in component for existing users
import { useState, ChangeEvent } from 'react';

import Sidebar from './Sidebar';

const LogIn = () => {
  const [body, setBody] = useState({
    username: '',
    password: ''
  });

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

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10">
        <form className="flex flex-col items-center gap-7">
          <div className="grid grid-cols-[100px_auto] gap-5 items-center">
            <label className='justify-self-end'>Username</label>
            <input
              type="text"
              onChange={(e) => handleUsername(e)}
              autoComplete="username"
              className='form-input'
            />
            <label className='justify-self-end'>Password</label>
            <input
              type="password"
              onChange={(e) => handlePassword(e)}
              autoComplete="current-password"
              className='form-input'
            />
          </div>
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
