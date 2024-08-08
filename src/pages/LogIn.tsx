import "../assets/styles";
import backgroundImg from "../assets/images/background.png";
import { useState } from "react";
import { Header } from "../components/main-components";
import { useSubmitLogin } from "../utils";
import { useNavigate } from "react-router-dom";
import InputFieldSubmit from "../components/input-field/InputFieldSubmit";

const LogIn = () => {
  const submitLogin = useSubmitLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleLogin = async () => {
    try {
      await submitLogin({
        email: formData.email,
        password: formData.password,
      });
      handleNavigate();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleNavigate = () => {
    setTimeout(() => navigate("/home"));
  };

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
        <div className="w-[432px] h-fit box-shadow p-[30px] rounded-[12px] mt-[80px]">
          <div className="flex flex-col items-center gap-[20px]">
            <div className="flex flex-col items-center">
              <p className="h1">Log in</p>
            </div>
            <form
              className="flex flex-col gap-[12px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <InputFieldSubmit
                title="Email/Username"
                value={formData.email}
                type="email"
                handleChangeValue={handleChangeValue}
              />
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
                onClick={handleLogin}
              >
                Next
              </button>
              <p className="body-text text-xs">Or</p>
              <button className="button-3 font-[500] box-shadow w-[352px] h-[40px] flex items-center justify-center gap-[16px]">
                <div className="w-[20px] h-[20px] flex justify-center">
                  <img
                    src="src/assets/images/Google.png"
                    alt="Device"
                    className=""
                  />
                </div>
                Log in with Google
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
