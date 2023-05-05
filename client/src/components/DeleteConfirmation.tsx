// Confirmation form for deleting careers or questions

const DeleteConfirmation = ({ item }: { item: string }) => {
  return (
    <div>
      <p>Are you sure you want to delete this {item}?</p>
      <div>
        <button className="btn">No, Keep It</button>
        <button className="btn">YES, DELETE IT</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
