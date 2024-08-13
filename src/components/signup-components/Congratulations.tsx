import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import "../../assets/styles/shadow.css";
import ButtonType from "../../types/button";

const Congratulations: React.FC<ButtonType> = ({ handleNextStep }) => {
  return (
    <div className="flex flex-col items-center gap-[24px] relative pt-[30px]">
      <div className="h-[102px] w-[102px] p-[24px] box-shadow rounded-[99px] absolute top-[-50%]">
        <img src="/images/logo.png" alt="logo" />
      </div>

      <p className="text-black text-sm not-italic font-medium leading-[normal] text-center mt-[18px]">
        Congratulations! Your XLock account is set up. Enjoy exploring without
        worrying about forgotten passwords 🎉 🎉 🎉
      </p>

      <div className="flex flex-col justify-center items-center gap-[8px]">
        <button
          className="button-2-fill w-[352px] h-[40px]"
          onClick={handleNextStep}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default Congratulations;
