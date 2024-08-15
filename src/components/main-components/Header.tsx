import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index.ts";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login.slice.ts";
import useModal from "../../utils/useModal.ts";

import "../../assets/styles/";

const Header = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login.login);
  const navigate = useNavigate();
  const { isOpen, closeModal, openModal, modalRef, buttonRef } = useModal();

  const handleNavLink = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(loginActions.handleFailureLogin());
    handleNavLink("/");
  };

  const handleLogoTrigger = () => {
    if (!loginState) navigate("/");
  };
  return (
    <>
      <div className="w-full bg-yellow h-[100px] px-[40px] py-[20px] flex justify-between items-center bg-white relative">
        <div
          className="xlock-logo h-fit w-fit flex items-center"
          onClick={handleLogoTrigger}
        >
          <img
            src="/images/Xlock_logo.png"
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
          {loginState && (
            <>
              <div
                className="size-[40px]"
                onClick={isOpen ? closeModal : openModal}
                ref={buttonRef}
              >
                <img src="src/assets/images/account.png" alt="account" />
              </div>
              {isOpen && (
                <div
                  className="w-fit h-fit rounded-[8px] box-shadow flex flex-col justify-between p-[16px] absolute bottom-[-30%] right-[2.5%] hover:bg-[#EFF0F0]"
                  ref={modalRef}
                  onClick={handleLogout}
                >
                  <p className="body-text">Log out</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
