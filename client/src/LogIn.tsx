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
      <div>
        <form>
          <label>Username</label>
          <input type="text" onChange={(e) => handleUsername(e)} />

          <label>Password</label>
          <input type="password" onChange={(e) => handlePassword(e)} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
