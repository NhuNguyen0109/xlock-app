import "../../assets/styles";

const Stepper: React.FC<{ step: number }> = ({ step }) => {
  return (
    <div className=" w-[432px] h-[50px] my-[30px] flex justify-between">
      <div className="progress flex w-[136px] h-full justify-between items-start">
        <div className="progress-bar flex flex-col mt-[4px]">
          <p className="text-black text-center text-xs not-italic font-normal leading-[normal] mb-[2px]">
            Add extension
          </p>
          <div
            className={`w-[92px] h-[11px] rounded-[10px] ${
              step >= 0 ? "bg-[#0C9600]" : "bg-[#D9D9D9]"
            }`}
          ></div>
        </div>
        <div className="w-[32px] h-full flex items-center">
          {step >= 1 ? (
            <img src="src/assets/images/checkpoint.png" alt="checkpoint" />
          ) : (
            <img src="src/assets/images/checkpoint2.png" alt="checkpoint2" />
          )}
        </div>
      </div>
      <div className="progress flex w-[136px] h-full justify-between items-start">
        <div className="progress-bar flex flex-col mt-[4px]">
          <p className="text-black text-center text-xs not-italic font-normal leading-[normal] mb-[2px]">
            Create account
          </p>
          <div
            className={`w-[92px] h-[11px] rounded-[10px] ${
              step >= 1 ? "bg-[#0C9600]" : "bg-[#D9D9D9]"
            }`}
          ></div>
        </div>
        <div className="w-[32px] h-full flex items-center">
          {step >= 5 ? (
            <img src="src/assets/images/checkpoint.png" alt="checkpoint" />
          ) : (
            <img src="src/assets/images/checkpoint2.png" alt="checkpoint2" />
          )}
        </div>
      </div>
      <div className="progress flex w-[136px] h-full justify-between items-start">
        <div className="progress-bar flex flex-col mt-[4px]">
          <p className="text-black text-center text-xs not-italic font-normal leading-[normal] mb-[2px]">
            Tutorial
          </p>
          <div
            className={`w-[92px] h-[11px] rounded-[10px] ${
              step >= 5 ? "bg-[#0C9600]" : "bg-[#D9D9D9]"
            }`}
          ></div>
        </div>
        <div className="w-[32px] h-full flex items-center">
          {step >= 6 ? (
            <img src="src/assets/images/checkpoint.png" alt="checkpoint" />
          ) : (
            <img src="src/assets/images/checkpoint2.png" alt="checkpoint2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
