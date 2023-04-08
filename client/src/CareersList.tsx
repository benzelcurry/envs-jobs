// Careers List page component
// Displays a list of all careers that are on website

import Sidebar from './Sidebar';

const CareersList = () => {
  return (
    <div>
      <Sidebar />
      <div className='flex flex-col flex-1 mt-10'>
        <p className='w-[450px] flex md:justify-center mx-auto p-5 text-xl'>
          Welcome to the careers page, where you can find a list of ENVS careers!
        </p>
        <p className='w-[450px] md:justify-center mx-auto p-5 text-xl'>
          Please note, this is not an exhaustive list of
          <span className="italic">every</span> ENVS career in
          existence. This site may be updated in the future to include more
          careers.
        </p>
        <div>
          <p className='w-[450px] flex md:justify-center mx-auto p-5 text-xl'>Careers will go here in a grid format.</p>
        </div>
      </div>
    </div>
  );
};

export default CareersList;