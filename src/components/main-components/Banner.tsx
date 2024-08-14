import backgroundImg from "../../assets/images/banner.png";
import "../../assets/styles";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[528px] relative">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "full",
          width: "full",
        }}
      >
        <button
          className="button-1-fill w-[200px] h-[52px] rounded-[8px] absolute text-[20px] bottom-[25%] left-[5%]"
          onClick={() => navigate("/signup")}
        >
          Try XLock now
        </button>
      </div>
    </div>
  );
};

export default Banner;
