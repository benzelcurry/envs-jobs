// Confirmation form for deleting careers or questions

interface Props {
  item: string;
  id: string;
  closeForm: (str: string) => void;
}

const DeleteConfirmation = ({ props }: { props: Props }) => {
  return (
    <div className="my-4 px-4">
      <p className="italic text-red-500 font-bold">
        Are you sure you want to delete this {props.item}?
      </p>
      <div className="my-4">
        <button className="btn" onClick={() => props.closeForm(props.id)}>
          No, Keep It
        </button>
        <button className="btn bg-red-500 hover:bg-red-400">
          YES, DELETE IT
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
