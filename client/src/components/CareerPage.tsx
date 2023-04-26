// Page for displaying details about individual careers
import { useState, useEffect } from 'react';
import { useParams, Params } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import { Career } from '../types';

interface RouteParams extends Params {
  id: string;
}

// TODO:
//   1. Begin making this page look nice
//     1.1 Mobile, desktop, AND light/dark
const CareerPage = () => {
  const { id } = useParams<RouteParams>();

  const [career, setCareer] = useState<Career>();

  useEffect(() => {
    axios
      .get(`/api/careers/${id}`)
      .then((response) => {
        setCareer(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  return (
    <div>
      <Sidebar />
      <div className='flex flex-col items-center mx-auto pt-5 gap-5'>
        <p className='border-b-2 border-green-500 text-5xl text-green-500'>{career?.title}</p>
        {career?.job_photo ? (
          <img src={`${import.meta.env.VITE_IMAGES}/${career?.job_photo}`} />
        ) : null}
        <p>{career?.description}</p>
        <div className='grid grid-cols-2'>
          <div className="flex flex-col">
            <h2 className='text-3xl'><span className='border-b-2 pb-2'>Career Attributes</span></h2>
            <ul className='m-4 list-disc'>
              {career?.attributes.map((attribute) => (
                <li key={uuidv4()}>{attribute}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>{career?.bio_quote}</p>
            {career?.bio_photo ? (
              <img src={`${import.meta.env.VITE_IMAGES}/${career?.bio_photo}`} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
