// Careers List page component
// Displays a list of all careers that are on website
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import { Career } from '../types';

const CareersList = () => {
  const [careers, setCareers] = useState<Career[]>();

  useEffect(() => {
    axios 
      .get(('/api/careers'))
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
        
      </div>
    </div>
  );
};

export default CareersList;
