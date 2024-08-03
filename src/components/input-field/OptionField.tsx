import "../../assets/styles/index";
import { ActiveInputType } from "../../types/input-field";

const OptionField: React.FC<ActiveInputType> = ({
  title,
  value,
  type,
  handleChangeValue,
}) => {
  return (
    <div className="h-fit w-[352px] flex flex-col gap-[6px]">
      <label htmlFor={type} className="body-text-bold px-[12px]">
        {title}
      </label>
      <div className="custom-select-wrapper">
        <select
          className="custom-select w-full h-[40px] rounded-[6px] border-solid border-[2px] border-[#D1D3D3] px-[12px] body-text"
          id={type}
          onChange={(event) => handleChangeValue?.(event)}
          value={value}
        >
          <option value="" disabled></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default OptionField;
