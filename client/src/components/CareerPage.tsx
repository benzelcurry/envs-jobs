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
      <div>
        <p>{career?.title}</p>
        <p>{career?.description}</p>
        <ul>
          {career?.attributes.map((attribute) => (
            <li key={uuidv4()}>{attribute}</li>
          ))}
        </ul>
        <p>{career?.bio_quote}</p>
        {career?.bio_photo ? (
          <img src={`${import.meta.env.VITE_IMAGES}/${career?.bio_photo}`} />
        ) : null}
        {career?.job_photo ? (
          <img src={`${import.meta.env.VITE_IMAGES}/${career?.job_photo}`} />
        ) : null}
      </div>
    </div>
  );
};

export default CareerPage;
