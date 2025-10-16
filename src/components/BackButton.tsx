import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mt-8 mb-5 btn btn-xs bg-white"
    >
      <IoIosArrowRoundBack />
      back
    </button>
  );
};

export default BackButton;
