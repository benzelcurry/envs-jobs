// Confirmation form for deleting careers or questions
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Props {
  item: string;
  id: string;
  title: string;
  closeForm: (str: string) => void;
}

const DeleteConfirmation = ({ props }: { props: Props }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    if (props.item === 'career') {
      axios
        .delete(
          `${import.meta.env.VITE_API}/careers/${props.id}` ||
            `/api/careers/${props.id}`,
          {
            headers: { Authorization: token }
          }
        )
        .then(() => {
          navigate(0);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else if (props.item === 'question') {
      axios
        .delete(
          `${import.meta.env.VITE_API}/questions/${props.id}` ||
            `/api/questions/${props.id}`,
          {
            headers: { Authorization: token }
          }
        )
        .then(() => {
          navigate(0);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  };

  return (
    <div className="my-4 px-4">
      <p className="italic text-red-500 font-bold">
        Are you sure you want to delete this {props.item}?
      </p>
      <div className="my-4">
        <button className="btn" onClick={() => props.closeForm(props.title)}>
          No, Keep It
        </button>
        <button
          onClick={() => handleDelete()}
          className="btn bg-red-500 hover:bg-red-400"
        >
          YES, DELETE IT
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
