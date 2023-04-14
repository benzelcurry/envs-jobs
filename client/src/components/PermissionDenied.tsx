// Permission Denied Page that displays when page doesn't exist or user doesn't have permission
import { TbError404 } from 'react-icons/tb';

const PermissionDenied = () => {
  return (
    <div className="flex flex-col flex-1 mt-10 text-xl">
      <TbError404 size="200" className="self-center text-green-500" />
      <h1 className="flex md:justify-center mx-auto p-5">Uh Oh!</h1>
      <p className="flex md:justify-center mx-auto p-5 w-[450px]">
        The page you're looking for either doesn't exist or you don't have
        permission to view it.
      </p>
    </div>
  );
};

export default PermissionDenied;