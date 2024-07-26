import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { registerActions } from "../../store/register-info.slice";
import { genPublicKey, genPrivateKey } from "../../utils/genKey";
import ButtonType from "../../types/button";

const GenerateKey: React.FC<ButtonType> = ({ handleNextStep }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const public_key = genPublicKey();
    const encrypted_private_key = genPrivateKey();
    dispatch(
      registerActions.setRegisterInfo({ public_key, encrypted_private_key })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div className="flex flex-col items-center">
        <p className="h1">Generate your key</p>
      </div>
      <p className="body-text font-[500] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis
      </p>
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <button
          className="button-2-fill w-[352px] h-[40px]"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default GenerateKey;
