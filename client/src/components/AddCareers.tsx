// Page for allowing admins to add new careers
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';

import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

interface Career {
  title: string;
  description: string;
  attributes: string[];
}

const AddCareers = ({ user }: { user: User }) => {
  const [careers, setCareers] = useState<Career[]>([]);

  // Pulls careers from DB and stores them in state
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
      <div>
        <div className='flex flex-col flex-1 mt-10 p-10'>
          <h2 className="text-3xl border-b-2 inline-block border-green-500 text-green-500">
            Current Careers
          </h2>
          <ul className='list-disc mt-2'>
            {
              careers ?
              careers.map((career) => 
                <li key={uuidv4()} className='ml-6 p-2'>{career.title}</li>
              )
              : null
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCareers;
