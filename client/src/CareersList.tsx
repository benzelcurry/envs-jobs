// Careers List page component
// Displays a list of all careers that are on website

import Sidebar from './Sidebar';

const CareersList = () => {
  return (
    <div>
      <Sidebar />
      <p>
        Welcome to the careers page, where you can find a list of ENVS careers!
      </p>
      <p>
        Please note, this is not an exhaustive list of{' '}
        <span className="font-bold italic">every</span> ENVS career in
        existence. This site may be updated in the future to include more
        careers.
      </p>
      <div>
        <p>Careers will go here in a grid format.</p>
      </div>
    </div>
  );
};

export default CareersList;