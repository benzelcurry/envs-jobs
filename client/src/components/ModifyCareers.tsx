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
  const [clickedTitle, setClickedTitle] = useState('');

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

  // Displays existing career modification form on click
  const displayForm = (career: string) => {
    clickedTitle === career ? setClickedTitle('') : setClickedTitle(career);
  };

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div className="flex flex-col flex-1 mt-10 p-10">
          <div>
            <h2 className='text-3xl border-b-2 border-green-500 inline-block text-green-500'>Current Careers:</h2>
            <ul className="list-disc mt-2">
              {careers.map((career) => (
                <li
                  aria-label="Click to modify career details"
                  key={Math.random() * 999}
                  className={
                    clickedTitle === career.title ?
                    "ml-6 border-2 border-rad rounded-md p-4 transition-all duration-300 border-green-500 md:w-[70%]"
                    :
                    "ml-6 p-4"
                  }
                >
                  <h3 className='text-lg cursor-pointer hover:text-green-500 transition-all duration-300 inline-block' onClick={() => displayForm(career.title)}>{career.title}</h3>
                  {
                    clickedTitle === career.title ?
                    <ModificationForm title={career.title} description={career.description} attributes={career.attributes} />
                    : null
                  }
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

const ModificationForm = ({ title, description, attributes }: Career) => {
  const [totalAttributes, setTotalAttributes] = useState(attributes.length);

  // Increments fields for totalAttributes on click
  const addAttributes = () => {
    setTotalAttributes(totalAttributes + 1);
  };

  return (
    <form className='grid grid-cols-[100px_auto] gap-5 mt-6'>
      <label htmlFor='career-title'>Title: </label>
      <input type="text" id='career-title' name='career-title' defaultValue={title} className='text-black p-2' />

      <label htmlFor='career-description'>Description: </label>
      <textarea id='career-description' name='career-description' defaultValue={description} className='text-black p-2' />

      <label htmlFor='career-attributes'>Attributes: </label>
      <div className='flex flex-col gap-5'>
        {
          attributes.map((attribute) => 
            <input key={Math.random() * 999} type="text" defaultValue={attribute} className='text-black p-2' />
          )
        }
      </div>
    </form>
  );
}

export default ModifyCareers;
