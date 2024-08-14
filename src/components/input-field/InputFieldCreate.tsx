import { ActiveInputType } from "../../types/input-field";

const InputFieldCreate: React.FC<ActiveInputType> = ({
  title,
  value,
  type,
  handleChangeValue,
}) => {
  return (
    <div className="h-[24px] w-full flex justify-between items-center gap-[20px]">
      <label className="body-text w-[100px] flex justify-end items-center">
        {title}
      </label>
      <input
        id={type}
        onChange={(event) => handleChangeValue?.(event)}
        value={value}
        className="focus:outline-[#0570EB] focus:bg-[#E6F1FD] 
                  w-[220px] h-[24px] px-[12px] rounded-[6px] body-text border-solid border-[2px] border-[#D1D3D3]"
      />
    </div>
  );
};

export default InputFieldCreate;
