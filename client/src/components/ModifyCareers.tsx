// Admin-restricted page for modifying careers
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { User } from '../types';

interface Career {
  title: string;
  description: string;
  attributes: string[];
}

// TODO:
//   1. Restrict non-admins from viewing this page even if JS disabled
//   2. Make sure to restrict routes to admins on the back-end as well
const ModifyCareers = ({ user }: { user: User }) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [clickedTitle, setClickedTitle] = useState('');

  // Pulls info about current careers in database and stores in careers state variable
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

  // Displays existing career modification form on click
  const displayForm = (career: string) => {
    clickedTitle === career ? setClickedTitle('') : setClickedTitle(career);
  };

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div className="flex flex-col flex-1 mt-10 p-10">
          <div>
            <h2 className="text-3xl border-b-2 border-green-500 inline-block text-green-500">
              Current Careers:
            </h2>
            <ul className="list-disc mt-2">
              {careers.map((career) => (
                <li
                  aria-label="Click to modify career details"
                  key={Math.random() * 999}
                  className={
                    clickedTitle === career.title
                      ? 'ml-6 border-2 border-rad rounded-md p-4 transition-all duration-300 border-green-500 md:w-[70%]'
                      : 'ml-6 p-4'
                  }
                >
                  <h3
                    className="text-lg cursor-pointer hover:text-green-500 transition-all duration-300 inline-block"
                    onClick={() => displayForm(career.title)}
                  >
                    {career.title}
                  </h3>
                  {clickedTitle === career.title ? (
                    <ModificationForm
                      title={career.title}
                      description={career.description}
                      attributes={career.attributes}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

// TODO:
//   4. MAKE IT SO EMPTY ATTRIBUTE FIELDS GET SKIPPED
//     4.1 Make it check for at least three attributes
//   5. Add error handling to prevent empty required fields
//   6. Patch new data to existing career DB entry using Axios
const ModificationForm = ({ title, description, attributes }: Career) => {
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newAttributes, setNewAttributes] = useState(
    attributes.map((attribute) => ({ id: uuidv4(), value: attribute }))
  );

  // Increments fields for totalAttributes on click
  const addAttributes = () => {
    setNewAttributes([...newAttributes, { id: uuidv4(), value: '' }]);
  };

  // Deletes an attribute field for totalAttributes on click
  const deleteAttributes = (id: string) => {
    setNewAttributes(newAttributes.filter((attribute) => attribute.id !== id));
  };

  // Handles change of input field for title
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // Handles change of input field for description
  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
  };

  // Handles change of input fields for attributes
  const changeAttributes = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const index = newAttributes.findIndex((attribute) => attribute.id === id);
    const updatedAttributes = [...newAttributes];
    updatedAttributes[index] = { id, value: e.target.value };
    setNewAttributes(updatedAttributes);
  };

  // Updates career on form submit
  const handleUpdate = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = {
      originalTitle: title,
      title: newTitle,
      description: newDescription,
      attributes: newAttributes.map((attribute) => attribute.value)
    };
    axios
      .put('/api/careers', body)
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <form className="grid grid-cols-[100px_auto] gap-5 mt-6">
      <label htmlFor="career-title">Title: </label>
      <input
        type="text"
        id="career-title"
        name="career-title"
        defaultValue={title}
        onChange={(e) => changeTitle(e)}
        className="text-black p-2"
      />

      <label htmlFor="career-description">Description: </label>
      <textarea
        id="career-description"
        name="career-description"
        defaultValue={description}
        onChange={(e) => changeDescription(e)}
        className="text-black p-2"
      />

      <label htmlFor="career-attributes">Attributes: </label>
      <div className="flex flex-col gap-5">
        {newAttributes.map((attribute) => (
          <div key={attribute.id} className="flex items-center ">
            <input
              type="text"
              defaultValue={attribute.value}
              onChange={(e) => changeAttributes(e, attribute.id)}
              className="text-black p-2 w-[100%]"
            />
            <RxCross1
              size="28"
              onClick={() => deleteAttributes(attribute.id)}
              className="ml-auto pl-2 cursor-pointer text-red-500 hover:text-red-300"
            />
          </div>
        ))}
        <AiOutlinePlusCircle
          size="40"
          onClick={() => addAttributes()}
          className="self-center text-green-500 cursor-pointer hover:text-green-300 transition-all delay-100"
        />
      </div>
      <button
        onClick={(e) => handleUpdate(e)}
        className="btn col-span-2 w-[50%] mx-auto"
      >
        Update Career
      </button>
    </form>
  );
};

export default ModifyCareers;
