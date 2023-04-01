import { TfiDropboxAlt } from "react-icons/tfi";
const EmptyBox = ({ text }) => {
  return (
    <div>
      <TfiDropboxAlt className=" text-6xl mt-2" />
      <p className=" -mt-2">{text}</p>
    </div>
  );
};

export default EmptyBox;
