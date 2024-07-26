import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/button.css";

const Header = () => {
  const loginState = useSelector((state: RootState) => state.login.login);
  const navigate = useNavigate();
  const handleNavLink = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <div className="w-full bg-yellow h-[100px] px-[40px] py-[20px] flex justify-between items-center bg-white">
        <div className="xlock-logo h-fit w-fit flex items-center">
          <img
            src="src/assets/images/Xlock_logo.png"
            alt="XLock_logo"
            className="scale-[0.8]"
          />
        </div>
        <div className="button-section w-fit h-full flex justify-between items-center gap-[16px]">
          {!loginState && (
            <>
              <button
                className="w-[90px] h-[40px] button-1-empty"
                onClick={() => handleNavLink("/login")}
              >
                Log in
              </button>
              <button
                className="w-[90px] h-[40px] button-1-fill"
                onClick={() => handleNavLink("/signup")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
