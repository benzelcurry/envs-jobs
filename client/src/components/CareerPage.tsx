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

const CareerPage = () => {
  const { id } = useParams<RouteParams>();

  const [career, setCareer] = useState<Career>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/careers/${id}` || `/api/careers/${id}`)
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
      <div className="flex flex-col mx-auto items-center pt-5 gap-5">
        <p className="border-b-2 border-green-500 text-5xl text-green-500">
          {career?.title}
        </p>
        {career?.job_photo ? (
          <img src={`${import.meta.env.VITE_IMAGES}/${career?.job_photo}`} />
        ) : null}
        <p
          className="w-[350px] md:w-[600px] lg:w-[750px] flex flex-col gap-7"
          dangerouslySetInnerHTML={{ __html: career?.description as string }}
        />
        <div
          // MIGHT NEED TO COME BACK AND CHANGE THIS ONCE PICS GET ADDED
          className={
            career?.bio_photo && career?.bio_quote
              ? 'md:grid md:grid-cols-2 mx-[20px]'
              : ''
          }
        >
          <div>
            <div className="flex flex-col">
              <h2 className="text-3xl">
                <span className="border-b-2 pb-2">Career Attributes</span>
              </h2>
              <ul className="m-4 list-disc">
                {career?.attributes.map((attribute) => (
                  <li key={uuidv4()}>{attribute}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl border-b-2 pb-2">
                <span>Helpful Certifications & Experience</span>
              </h2>
              <ul className="m-4 list-disc">
                {career?.certifications?.map((cert) => (
                  <li key={uuidv4()}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pb-4">
            <div className="flex flex-col items-center gap-5">
              {career?.bio_photo ? (
                <img
                  src={`${import.meta.env.VITE_IMAGES}/${career?.bio_photo}`}
                />
              ) : null}
              <p>{career?.bio_quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
