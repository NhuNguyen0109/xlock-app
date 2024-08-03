import { useState } from "react";

import ButtonType from "../../types/button";
import InputFieldSubmit from "../input-field/InputFieldSubmit";
import OptionField from "../input-field/OptionField";
import { useDispatch } from "react-redux";
import { registerActions } from "../../store/register-info.slice";
import "../../assets/styles/button.css";
import "../../assets/styles/shadow.css";

const CreateProfile: React.FC<ButtonType> = ({ handleNextStep }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    address: "",
    phone_number: "",
    country: "",
    gender: "",
    backup_email: "",
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(registerActions.setRegisterInfo(formData));
    handleNextStep();
  };

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="flex flex-col items-center">
        <p className="h1">Create your Profile</p>
      </div>
      <form
        className="flex justify-between w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-[12px]">
          <InputFieldSubmit
            title="Full name"
            value={formData.fullname}
            type="fullname"
            handleChangeValue={handleChangeValue}
          />
          <InputFieldSubmit
            title="Date of birth"
            value={formData.dob}
            type="dob"
            handleChangeValue={handleChangeValue}
          />
          <OptionField
            title="Gender"
            value={formData.gender}
            type="gender"
            handleChangeValue={handleChangeValue}
          />
          <InputFieldSubmit
            title="Phone number"
            value={formData.phone_number}
            type="phone_number"
            handleChangeValue={handleChangeValue}
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <InputFieldSubmit
            title="Country"
            value={formData.country}
            type="country"
            handleChangeValue={handleChangeValue}
          />
          <InputFieldSubmit
            title="Address"
            value={formData.address}
            type="address"
            handleChangeValue={handleChangeValue}
          />
          <InputFieldSubmit
            title="Backup email"
            value={formData.backup_email}
            type="backup_email"
            handleChangeValue={handleChangeValue}
          />
        </div>
      </form>
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <button
          className="button-2-fill w-[352px] h-[40px]"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default CreateProfile;
