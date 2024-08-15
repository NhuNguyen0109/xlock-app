import "../assets/styles";
import backgroundImg from "../assets/images/background.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Header } from "../components/main-components";
import Stepper from "../components/stepper/Stepper";
import {
  AddExtension,
  CreateAccount,
  CreatePassword,
  CreateProfile,
  GenerateKey,
  Tutorial,
  Congratulations,
} from "../components/signup-components";
import { RootState } from "../store";
import { apiCall, ApiEndpoints, useSubmitLogin } from "../utils";
import { useNavigate } from "react-router-dom";
import RegisterInfo, { ResponseRegisterInfo } from "../types/register-info";
import { getAccessToken } from "../utils/access-token";

const SignUp = () => {
  const [component, setComponent] = useState(0);
  const registerInfo = useSelector((state: RootState) => state.register);
  const submitLogin = useSubmitLogin();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: apiCall<ResponseRegisterInfo, RegisterInfo>,
    onSuccess: (data) => {
      console.log(data);
      handleNextStep();
    },
    onError: (error) => {
      console.error("Register Failed", error);
    },
  });

  const handleSubmit = () => {
    console.log(registerInfo);
    mutate({
      method: "POST",
      endpoint: ApiEndpoints.Register,
      requestData: registerInfo,
    });
  };

  const handleLogin = async () => {
    handleNextStep();
    try {
      const success = await submitLogin({
        identity: registerInfo.email,
        password: registerInfo.password,
      });
      if (success) {
        console.log("successlogin");
        console.log("token in storage", getAccessToken());
      } else {
        console.error("Login process failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleNavigate = () => {
    navigate("/home");
  };

  const handleNextStep = () => {
    if (component < components.length - 1) {
      setComponent(component + 1);
    } else {
      console.log("Done sign up");
    }
  };

  const components = [
    <AddExtension key="add-extension" handleNextStep={handleNextStep} />,
    <CreateAccount key="create-account" handleNextStep={handleNextStep} />,
    <CreatePassword key="create-password" handleNextStep={handleNextStep} />,
    <CreateProfile key="create-profile" handleNextStep={handleNextStep} />,
    <GenerateKey key="generate-key" handleNextStep={handleSubmit} />,
    <Tutorial key="tutorial" handleNextStep={handleLogin} />,
    <Congratulations key="congratulations" handleNextStep={handleNavigate} />,
  ];

  return (
    <div className="h-screen flex flex-col justify-center">
      <Header />
      <div
        className="flex flex-col flex-grow items-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "full",
          width: "full",
        }}
      >
        <Stepper step={component} />
        <div
          className={`content ${
            component === 3 ? "w-[814px]" : "w-[432px]"
          } h-fit box-shadow p-[30px] rounded-[12px] ${
            component === 6 ? "mt-[30px]" : null
          }`}
        >
          {components[component]}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
