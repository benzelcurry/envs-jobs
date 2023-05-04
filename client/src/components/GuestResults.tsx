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
      .get('/api/careers')
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
    setMatches(tempMatches);
  }, [careers]);

  return (
    <div>
      <h3 className="text-xl font-bold border-b-2 border-green-500 inline-block text-green-500">
        Career Matches*:{' '}
      </h3>
      <ul className="list-disc pt-2">
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
      </ul>
    </div>
  );
};

export default GuestResults;
