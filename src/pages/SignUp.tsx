import "../assets/styles/shadow.css";
import "../assets/styles/border.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import backgroundImg from "../assets/images/background.png";
import Header from "../components/main-components/Header";
import Stepper from "../components/stepper/Stepper";
import AddExtension from "../components/signup-components/AddExtension";
import CreateAccount from "../components/signup-components/CreateAccount";
import CreatePassword from "../components/signup-components/CreatePassword";
import GenerateKey from "../components/signup-components/GenerateKey";
import Tutorial from "../components/signup-components/Tutorial";
import Congratulations from "../components/signup-components/Congratulations";
import { RootState } from "../store";
import { RegisterInfo } from "../store/register-info.slice";
import apiCall from "../utils/apiCall";
import { useNavigate } from "react-router-dom";
import { useSubmitLogin, useLoggedIn } from "../utils/useHandleLogin";
import requestSendToken from "../utils/browserCall/request.send.token";
import requestSendSalt from "../utils/browserCall/request.send.salt";

const SignUp = () => {
  const [component, setComponent] = useState(0);
  const registerInfo = useSelector((state: RootState) => state.register);
  const submitLogin = useSubmitLogin();
  const loggedIn = useLoggedIn();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: apiCall<RegisterInfo>,
    onSuccess: (data) => {
      console.log(data);
      submitLogin(data.data.id);
      async () => {
        await requestSendToken(data.data.token);
        await requestSendSalt(data.data.salt);
      };
    },
  });

  const handleSubmit = () => {
    console.log(registerInfo);
    mutate({
      method: "POST",
      endpoint: "/api/v1/auth/create",
      requestData: registerInfo,
    });
    handleNextStep();
  };

  const loginHomepage = () => {
    loggedIn();
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
    <GenerateKey key="generate-key" handleNextStep={handleSubmit} />,
    <Tutorial key="tutorial" handleNextStep={handleNextStep} />,
    <Congratulations key="congratulations" handleNextStep={loginHomepage} />,
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
          className={`content w-[432px] h-fit box-shadow p-[30px] rounded-[12px] ${
            component === 5 ? "mt-[30px]" : null
          }`}
        >
          {components[component]}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
