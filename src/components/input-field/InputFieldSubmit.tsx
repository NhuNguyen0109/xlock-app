import "../../assets/styles/border.css";
import "../../assets/styles/text.css";
import { useRef } from "react";
import { ActiveInputType } from "../../types/input-field";

const InputFieldSubmit: React.FC<ActiveInputType> = ({
  title,
  value,
  type,
  handleChangeValue,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);

  const showPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
    }
  };

  return (
    <div className="h-fit w-[352px] flex flex-col gap-[6px]">
      <label htmlFor={type} className="body-text-bold px-[12px]">
        {title}
      </label>
      <input
        id={type}
        onChange={(event) => handleChangeValue?.(event)}
        value={value}
        className="border-solid border-[2px] border-[#D1D3D3] w-full h-[40px] bg-white px-[12px] rounded-[6px] body-text"
        ref={passwordRef}
        type={type}
      />
      {type === "password" && (
        <div className="mt-[4px]">
          <input type="checkbox" onClick={showPassword} className="body-text" />{" "}
          Show Password
        </div>
      )}
    </div>
  );
};

export default InputFieldSubmit;
