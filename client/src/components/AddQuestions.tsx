// Page for allowing admins to add new questions
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User, Question } from '../types';

const AddQuestions = ({ user }: { user: User }) => {
  const [questions, setQuestions] = useState<Question[]>();

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div>
          <div className="flex flex-col flex-1 mt-10 p-10">
            <h2 className="text-3xl border-b-2 inline-block border-green-500 text-green-500">
              Current Questions
            </h2>
            <ul className="list-disc mt-2"></ul>

            <h2 className="text-3xl border-b-2 inline-block border-green-500 text-green-500">
              Add New Question
            </h2>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default AddQuestions;
