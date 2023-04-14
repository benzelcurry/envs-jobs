// Profile page component
// Displays user info (name, career rankings, etc.)

import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User } from '../types';

// TODO:
//   1. Display links to add/remove-career pages on admin page
const Profile = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      {user.username ? (
        <div className="flex flex-col flex-1 mt-10 p-10">
          <h1 className="text-5xl mb-5">
            {user.first_name} {user.family_name}
          </h1>
          {/* MAKE THESE CONDITIONALLY DISPLAY DEPENDING ON USER STATUS */}
          <div className="p-2">
            <h3>Admin contents.</h3>
            <Link to="/modify-questions">
              <button className="btn">Modify Questions</button>
            </Link>
            <Link to="/modify-careers">
              <button className="btn">Modify Careers</button>
            </Link>
          </div>
          <div className="p-2">
            <h3>Non-admin contents.</h3>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default Profile;
