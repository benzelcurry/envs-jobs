// Profile page component
// Displays user info (name, career rankings, etc.)

import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User } from '../types';

const Profile = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      {user.username ? (
        <div className="flex flex-col items-center md:items-start flex-1 mt-10 p-10">
          <h1 className="text-5xl mb-5">
            {user.first_name} {user.family_name}
          </h1>
          <div className="p-2">
            {user.attributes.length > 0 ? (
              <div>
                <h3>Career Attributes: </h3>
                <ul>
                  {user.attributes.map((attribute) => (
                    <li>{attribute}</li>
                  ))}
                </ul>
                {/* ADD CAREER MATCHES HERE */}
              </div>
            ) : (
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-lg text-center md:text-start">
                  Take the questionnaire below to find out what career
                  attributes you prefer!
                </h2>
                <Link to="/questionnaire">
                  <button className="btn mt-3 mb-3 self-center w-[200px] md:self-start">
                    Questionnaire
                  </button>
                </Link>
              </div>
            )}
          </div>
          {user.is_admin ? (
            <div className="p-2">
              <h2 className="text-lg text-center md:text-start">
                Admin Contents
              </h2>
              <div className="flex flex-col justify-center md:justify-start md:grid md:grid-cols-[auto_auto]">
                <Link to="/modify-questions">
                  <button className="btn m-5 w-[200px]">
                    Modify Questions
                  </button>
                </Link>
                <Link to="/modify-careers">
                  <button className="btn m-5 w-[200px]">Modify Careers</button>
                </Link>
                <Link to="/add-questions">
                  <button className="btn m-5 w-[200px]">Add Questions</button>
                </Link>
                <Link to="/add-careers">
                  <button className="btn m-5 w-[200px]">Add Careers</button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default Profile;
