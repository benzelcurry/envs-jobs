// Admin-restricted page for modifying careers
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User } from '../types';

interface Career {
  title: string;
  description: string;
  attributes: string[];
}

// TODO:
//   1. Restrict non-admins from viewing this page even if JS disabled
//   2. Make sure to restrict routes to admins on the back-end as well
const ModifyCareers = ({ user }: { user: User }) => {
  const [careers, setCareers] = useState<Career[]>([]);

  // Pulls info about current careers in database and stores in careers state variable
  useEffect(() => {
    axios
      .get('/api/careers')
      .then((response) => {
        setCareers(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div className="flex flex-col flex-1 mt-10 p-10">
          <div>
            <h2>Current Careers:</h2>
            <ul className="list-disc mt-2">
              {careers.map((career) => (
                <li
                  aria-label="Click to modify career details"
                  className="ml-6 cursor-pointer hover:text-green-500 transition-all duration-300"
                >
                  {career.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default ModifyCareers;
