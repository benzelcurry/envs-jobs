// Careers List page component
// Displays a list of all careers that are on website
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import { Career } from '../types';

const CareersList = () => {
  const [careers, setCareers] = useState<Career[]>();

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
      <div className="flex flex-col flex-1 mt-10">
        <ul className="list-disc mt-2 ml-10">
          {careers?.map((career) => (
            <li
              aria-label="Click to view more details"
              key={uuidv4()}
              className="ml-6 p-4"
            >
              {career.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CareersList;
