import { useState } from "react";

import ButtonType from "../../types/button";
import InputFieldSubmit from "../input-field/InputFieldSubmit";
import { useDispatch } from "react-redux";
import { registerActions } from "../../store/register-info.slice";
import "../../assets/styles/button.css";
import "../../assets/styles/shadow.css";

const CreateAccount: React.FC<ButtonType> = ({ handleNextStep }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(registerActions.setRegisterInfo(formData));
    console.log("dsdsd");
    handleNextStep();
  };

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="flex flex-col items-center">
        <p className="h1">Create your account</p>
      </div>
      <form
        className="flex flex-col gap-[12px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <InputFieldSubmit
          title="Username"
          value={formData.username}
          type="username"
          handleChangeValue={handleChangeValue}
        />
        <InputFieldSubmit
          title="Email"
          value={formData.email}
          type="email"
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
        <p className="body-text text-xs">Or</p>
        <button className="button-3 font-[500] box-shadow w-[352px] h-[40px] flex items-center justify-center gap-[16px]">
          <div className="w-[20px] h-[20px] flex justify-center">
            <img src="src/assets/images/Google.png" alt="Device" className="" />
          </div>
          Sign up with Google
        </button>
        <p className="body-text text-xs">
          By proceeding, you agree to our Term of Service
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default CreateAccount;
