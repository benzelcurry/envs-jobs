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
          <div className="p-2">
            <ul>
              { 
                user.attributes.length > 0 ?
                user.attributes.map((attribute) => 
                  <li>{attribute}</li>
                )
                :
                <div className='flex flex-col'>
                  <p>Take the questionnaire below to find out what career attributes you prefer!</p>
                  <button className="btn mt-3 mb-3 self-center w-[200px] md:self-start">Questionnaire</button>
                </div>
              }
            </ul>
          </div>
          <div className="p-2">
            <h3>Admin contents.</h3>
            <div className='flex justify-center md:justify-start'>
              <Link to="/modify-questions">
                <button className="btn m-5 w-[200px]">Modify Questions</button>
              </Link>
              <Link to="/modify-careers">
                <button className="btn m-5 w-[200px]">Modify Careers</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default Profile;
