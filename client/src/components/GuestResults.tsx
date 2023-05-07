// Displays results for guests; used within the Questionnaire component
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Career } from '../types';

interface Match {
  title: string;
  percentage: number;
}

const GuestResults = ({ results }: { results: string[] }) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  // Pulls careers from DB and stores in state
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/careers` || '/api/careers')
      .then((response) => {
        setCareers(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  // Ranks careers in order of shared attributes with user
  useEffect(() => {
    const tempMatches: Match[] = [];
    for (const job of careers) {
      let tracker = 0;
      for (const trait of results) {
        if (job.attributes.includes(trait)) tracker++;
      }
      tempMatches.push({
        title: job.title,
        percentage: Number((tracker / results.length).toFixed(2))
      });
    }
    tempMatches.sort((a, b) => b.percentage - a.percentage);
    setMatches(tempMatches);
  }, [careers]);

  return (
    <div className="ml-10">
      <div className="flex gap-10">
        <div>
          <h3 className="text-xl font-bold border-b-2 border-green-500 inline-block text-green-500">
            Preferred Attributes:{' '}
          </h3>
          <ul className="list-disc pt-2">
            {results.map((attribute) => (
              <li key={uuidv4()} className="ml-4">
                {attribute}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold border-b-2 border-green-500 inline-block text-green-500">
            Career Matches*:{' '}
          </h3>
          <ol className="list-decimal pt-2">
            {matches.map((match) => (
              <li key={uuidv4()} className="ml-4">
                <Link to={`/careers/${match.title}`}>
                  <span className="text-green-500 hover:text-green-300">
                    {match.title}
                  </span>
                </Link>
                : {match.percentage}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="pt-10 text-sm italic w-[300px] md:w-[600px]">
        * Career match scores represent the percentage of your preferred
        attributes that appear in the career's listed attributes. This is a
        rough estimate of fit and isn't meant to be a definitive ranking.
      </p>
    </div>
  );
};

export default GuestResults;
