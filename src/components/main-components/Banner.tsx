import backgroundImg from "../../assets/images/banner.png";
import "../../assets/styles";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex relative self-stretch">
      <div
        className="size-full"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          // height: "full",
          // width: "full",
        }}
      >
        <button
          className="button-1-fill w-[230px] h-[58px] rounded-[8px] absolute text-[24px] bottom-[25%] left-[5%]"
          onClick={() => navigate("/signup")}
        >
          Try XLock now
        </button>
      </div>
    </div>
  );
};

export default Banner;
