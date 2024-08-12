import { useState } from "react";

import ButtonType from "../../types/button";
import InputFieldSubmit from "../input-field/InputFieldSubmit";
import { useDispatch } from "react-redux";
import { registerActions } from "../../store/register-info.slice";
import "../../assets/styles/button.css";
import "../../assets/styles/shadow.css";

const CreatePassword: React.FC<ButtonType> = ({ handleNextStep }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    dispatch(registerActions.setRegisterInfo({ password: formData.password }));
    handleNextStep();
  };

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="flex flex-col items-center">
        <p className="h1">Create your password</p>
      </div>
      <form
        className="flex flex-col gap-[12px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <InputFieldSubmit
          title="Password"
          value={formData.password}
          type="password"
          handleChangeValue={handleChangeValue}
        />
      </form>
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <button
          className="button-2-fill w-[352px] h-[40px]"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreatePassword;
