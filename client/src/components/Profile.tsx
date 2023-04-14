// Profile page component
// Displays user info (name, career rankings, etc.)

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied'; 

import { User } from '../types';

// TODO:
//   1. Make page redirect to 404 page if user isn't logged in or 
//      tries visiting someone else's page
//   2. Display links to add/remove-career pages on admin page

const Profile = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      { user.username ?
      <div className="flex flex-col flex-1 mt-10 p-10">
        <h1 className='text-5xl mb-5'>{user.first_name} {user.family_name}</h1>
        <div className='p-2'>
          <h3>Admin contents.</h3>
        </div>
        <div className='p-2'>
          <h3>Non-admin contents.</h3>
        </div>
      </div>
      : <PermissionDenied />
      }      
    </div>
  );
};

export default Profile;
