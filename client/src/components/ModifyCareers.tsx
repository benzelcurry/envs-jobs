// Admin-restricted page for modifying careers
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import Cropper from './ImageCropper';
import PermissionDenied from './PermissionDenied';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { User, Career } from '../types';

// TODO:
// 1. Make career description textarea increase to fit contents
// 2. Pull bio pic and job pic and bio quote when displaying current details
// 3. Allow user to modify fields mentioned in TODO #3
//  3.1 Might need to modify the above interface

const ModifyCareers = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const [careers, setCareers] = useState<Career[]>([]);
  const [clickedTitle, setClickedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Redirects user to another page if they aren't an admin
  useEffect(() => {
    if ((!user || !user.is_admin) && !isLoading) {
      navigate('/404');
    } else {
      setIsLoading(false);
    }
  }, [user]);

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
                  key={uuidv4()}
                  className={
                    clickedTitle === career.title
                      ? 'ml-6 border-2 border-rad rounded-md p-4 transition-all duration-300 border-green-500 lg:w-[60%]'
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
                    <ModificationForm career={career} />
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

const ModificationForm = ({ career }: { career: Career }) => {
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(career.title);
  const [newDescription, setNewDescription] = useState(career.description);
  const [newAttributes, setNewAttributes] = useState(
    career.attributes.map((attribute) => ({ id: uuidv4(), value: attribute }))
  );
  const [newCerts, setNewCerts] = useState(
    career.certifications?.map((cert) => ({ id: uuidv4(), value: cert }))
  );
  const [bioPhoto, setBioPhoto] = useState<File | null>(null);
  const [careerPhoto, setCareerPhoto] = useState<File | null>(null);
  const [bioQuote, setBioQuote] = useState('');
  const [error, setError] = useState('');

  // Increments fields for totalAttributes on click
  const addAttributes = () => {
    setNewAttributes([...newAttributes, { id: uuidv4(), value: '' }]);
  };

  // Deletes an attribute field for totalAttributes on click
  const deleteAttributes = (id: string) => {
    setNewAttributes(newAttributes.filter((attribute) => attribute.id !== id));
  };

  // Increments fieds for certifications on click
  const addCerts = () => {
    if (newCerts === undefined) {
      setNewCerts([{ id: uuidv4(), value: '' }])
    } else {
      setNewCerts([...newCerts, { id: uuidv4(), value: '' }]);
    };
  };

  // Deletes an attribute field for totalAttributes on click
  const deleteCerts = (id: string) => {
    setNewCerts(newCerts!.filter((cert) => cert.id !== id));
  };

  // Handles change of input field for title
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // Handles change of input field for description
  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const str = e.target.value;
    const strHTML = str
      .split(/\n\n+/)
      .map((x) => `<p> ${x} </p>`)
      .join('');
    setNewDescription(strHTML);
  };

  // Handles change of input field for biography quote
  const changeQuote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBioQuote(e.target.value);
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
    const token = localStorage.getItem('token');
    const body = new FormData();
    body.append('originalTitle', career.title);
    if (career.job_photo) body.append('originalJobPhoto', career.job_photo);
    if (career.bio_photo) body.append('originalBioPhoto', career.bio_photo);
    body.append('title', newTitle);
    body.append('description', newDescription);
    newAttributes.forEach((attribute) => {
      body.append('attributes', attribute.value);
    });
    if (token) body.append('token', token);
    if (bioPhoto) body.append('bio_photo', bioPhoto);
    if (careerPhoto) body.append('job_photo', careerPhoto);
    if (bioQuote) body.append('quote', bioQuote);
    axios
      .put('/api/careers', body)
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        setError(err.response.data.errors[0].msg);
        throw new Error(err);
      });
  };

  return (
    <form className="grid grid-cols-[150px_auto] gap-5 mt-6">
      <p className="col-span-2 italic">* indicates required field</p>

      <label htmlFor="career-title">Title*: </label>
      <input
        type="text"
        id="career-title"
        name="career-title"
        defaultValue={career.title}
        onChange={(e) => changeTitle(e)}
        className="text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="career-description">Description*: </label>
      <div>
        <textarea
          id="career-description"
          name="career-description"
          defaultValue={career.description}
          onChange={(e) => changeDescription(e)}
          className="w-[100%] text-black p-2 border-2 border-black dark:border-transparent"
        />
        <p className="text-sm">Hit 'enter' twice to start a new paragraph.</p>
      </div>

      <label htmlFor="career-attributes">Attributes*: </label>
      <div className="flex flex-col gap-5">
        {newAttributes.map((attribute) => (
          <div key={attribute.id} className="flex items-center ">
            <input
              type="text"
              defaultValue={attribute.value}
              onChange={(e) => changeAttributes(e, attribute.id)}
              className="text-black p-2 w-[100%] border-2 border-black dark:border-transparent"
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

      <label>Current Career Photo: </label>
      <div>
        {career.job_photo ? (
          <img
            src={`${import.meta.env.VITE_IMAGES}/${career.job_photo}`}
            alt="Career imagery"
          />
        ) : (
          <p>No current career photo.</p>
        )}
      </div>

      <label>Current Headshot: </label>
      <div>
        {career.bio_photo ? (
          <img
            src={`${import.meta.env.VITE_IMAGES}/${career.bio_photo}`}
            alt="Career imagery"
          />
        ) : (
          <p>No current headshot.</p>
        )}
      </div>

      <label>Career Photo: </label>
      <Cropper setPhoto={setCareerPhoto} circle={false} />

      <label>Headshot: </label>
      <Cropper setPhoto={setBioPhoto} circle={true} />

      <label htmlFor="pro-quote">Professional Quote: </label>
      <textarea
        id="pro-quote"
        name="pro-quote"
        onChange={(e) => changeQuote(e)}
        defaultValue={career.bio_quote}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      {error ? (
        <p className="col-span-2 text-red-500 mx-auto italic">{error}</p>
      ) : null}
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
