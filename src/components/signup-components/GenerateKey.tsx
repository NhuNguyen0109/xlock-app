import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { registerActions } from "../../store/register-info.slice";
import requestKeyPair from "../../utils/browserCall/request.key.pair";
import ButtonType from "../../types/button";

const GenerateKey: React.FC<ButtonType> = ({ handleNextStep }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const generateKeyPair = async () => {
      try {
        const { privateKey: encrypted_private_key, publicKey: public_key } =
          await requestKeyPair();
        console.log(encrypted_private_key, public_key);
        dispatch(
          registerActions.setRsaKeyPairs({
            public: public_key,
            enc_pri: encrypted_private_key,
          })
        );
      } catch (error) {
        console.error("Error generating key pair:", error);
      }
    };

    generateKeyPair();
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
