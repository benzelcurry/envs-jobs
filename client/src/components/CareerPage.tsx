// Page for displaying details about individual careers
import { useParams, Params } from 'react-router-dom';

import Sidebar from './Sidebar';
import { Career } from '../types';

interface RouteParams extends Params {
  id: string;
};

const CareerPage = () => {
  const { id } = useParams<RouteParams>();

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