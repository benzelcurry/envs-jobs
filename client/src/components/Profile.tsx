// Profile page component
// Displays user info (name, career rankings, etc.)

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User, Career } from '../types';

interface Match {
  title: string;
  percentage: number;
}

const Profile = ({ user }: { user: User }) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  // Pulls careers from DB and stores in state
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

  // Ranks careers in order of shared attributes with user
  useEffect(() => {
    const tempMatches: Match[] = [];
    for (const job of careers) {
      let tracker = 0;
      for (const trait of user.attributes) {
        if (job.attributes.includes(trait)) tracker++;
      }
      tempMatches.push({
        title: job.title,
        percentage: Number((tracker / user.attributes.length).toFixed(2))
      });
    }
    setMatches(tempMatches);
  }, [careers]);

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
                <div className="flex gap-10">
                  <div>
                    <h3 className="text-xl font-bold border-b-2 border-green-500 inline-block text-green-500">
                      Preferred Attributes:{' '}
                    </h3>
                    <ul className="list-disc pt-2">
                      {user.attributes.map((attribute) => (
                        <li key={uuidv4()} className="ml-4">
                          {attribute}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold border-b-2 border-green-500 inline-block text-green-500">
                      Career Matches*:{' '}
                    </h3>
                    <ol className="list-decimal pt-2">
                      {matches.map((match) => (
                        <li key={uuidv4()} className="ml-4">
                          <Link to={`/careers/${match.title}`}>
                            <span className="text-green-500 hover:text-green-300">
                              {match.title}
                            </span>
                          </Link>
                          : {match.percentage}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <p className="pt-10 text-sm italic w-[300px] md:w-[600px]">
                  * Career match scores represent the percentage of your
                  preferred attributes that appear in the career's listed
                  attributes. This is a rough estimate of fit and isn't meant to
                  be a definitive ranking.
                </p>
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
            <div className="p-2 flex flex-col items-center md:block">
              <h2 className="text-xl font-bold border-b-2 border-green-500 inline-block text-green-500">
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
