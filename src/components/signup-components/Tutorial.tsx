import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import ButtonType from "../../types/button";

const Tutorial: React.FC<ButtonType> = ({ handleNextStep }) => {
  return (
    <div className="flex flex-col items-center gap-[24px]">
      <div className="flex flex-col items-center gap-[24px] relative w-full">
        <hr className="h-full border-[1px] border-solid border-[#D9D9D9] absolute left-[14%]"></hr>
        <div className="step flex w-full justify-between">
          <span
            className="h-[32px] w-[32px] bg-[#0570EB] rounded-[99px] flex justify-center items-center 
        text-white text-center text-xl not-italic font-[700] leading-[normal];"
          >
            1
          </span>
          <div className="flex flex-col w-[290px] h-full">
            <p className="text-black text-lg not-italic font-bold leading-[normal]">
              Open XLock
            </p>
            <p className="text-black text-sm not-italic font-medium leading-[normal]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
        <div className="step flex w-full justify-between">
          <span
            className="h-[32px] w-[32px] bg-[#0570EB] rounded-[99px] flex justify-center items-center 
        text-white text-center text-xl not-italic font-[700] leading-[normal];"
          >
            2
          </span>
          <div className="flex flex-col w-[290px] h-full">
            <p className="text-black text-lg not-italic font-bold leading-[normal]">
              Log in
            </p>
            <p className="text-black text-sm not-italic font-medium leading-[normal]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
        <div className="step flex w-full justify-between">
          <span
            className="h-[32px] w-[32px] bg-[#0570EB] rounded-[99px] flex justify-center items-center 
        text-white text-center text-xl not-italic font-[700] leading-[normal];"
          >
            3
          </span>
          <div className="flex flex-col w-[290px] h-full">
            <p className="text-black text-lg not-italic font-bold leading-[normal]">
              Get quick access to XLock
            </p>
            <p className="text-black text-sm not-italic font-medium leading-[normal]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-[8px]">
        <button
          className="button-2-fill w-[352px] h-[40px]"
          onClick={handleNextStep}
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
