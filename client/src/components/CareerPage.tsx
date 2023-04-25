// Page for displaying details about individual careers
import { useState, useEffect } from 'react';
import { useParams, Params } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import { Career } from '../types';

interface RouteParams extends Params {
  id: string;
};

const CareerPage = () => {
  const { id } = useParams<RouteParams>();

  const [career, setCareer] = useState<Career>();

  useEffect(() => {
    axios
      .get((`/api/careers/${id}`))
      .then((response) => {
        setCareer(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      })
  })

  return (
    <div>
      <Sidebar />
      <div>
        { id }
      </div>
    </div>
  );
};

export default CareerPage;