import "../../assets/styles/border.css";
import { ActiveInputType } from "../../types/input-field";

const InputFieldSubmit: React.FC<ActiveInputType> = ({
  title,
  value,
  type,
  handleChangeValue,
}) => {
  return (
    <div className="h-fit w-[352px] flex flex-col gap-[6px]">
      <label id={title} className="body-text-bold px-[12px]">
        {title}
      </label>
      <input
        id={type}
        onChange={(event) => handleChangeValue?.(event)}
        value={value}
        className="border-solid border-[2px] border-[#D1D3D3] w-full h-[40px] bg-white px-[12px] rounded-[6px] body-text"
      ></input>
    </div>
  );
};

export default InputFieldSubmit;
