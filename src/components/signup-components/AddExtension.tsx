import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import ButtonType from "../../types/button";

const AddExtension: React.FC<ButtonType> = ({ handleNextStep }) => {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="flex flex-col items-center">
        <p className="h1">Add extension</p>
        <p className="h1">to your browser</p>
      </div>
      <p className="body-text font-[500] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis
      </p>
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <button
          className="button-2-fill w-[352px] h-[40px]"
          onClick={handleNextStep}
        >
          Add extenstion now
        </button>
        <button
          className="button-2-empty w-[352px] h-[40px]"
          onClick={handleNextStep}
        >
          Add extension later
        </button>
        <p className="body-text text-xs">
          Adding extension is mandatory to use XLock service
        </p>
      </div>
    </div>
  );
};

export default AddExtension;
