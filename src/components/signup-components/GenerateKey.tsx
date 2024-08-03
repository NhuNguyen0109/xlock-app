import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { registerActions } from "../../store/register-info.slice";
import requestKeyPair from "../../utils/browserCall/request.key.pair";
import requestEncryptPrivateKey from "../../utils/browserCall/request.encrypt.key";
import { base64ToCryptoKey } from "../../utils/handleHassPassType";
import ButtonType from "../../types/button";
import requestHashPassword from "../../utils/browserCall/request.hash";

const GenerateKey: React.FC<ButtonType> = ({ handleNextStep, setVector }) => {
  const dispatch = useDispatch();
  const password = useSelector((state: RootState) => state.register.password);

  useEffect(() => {
    const generateKeyPair = async () => {
      try {
        const { privateKey, publicKey } = await requestKeyPair();
        const { encryptedPrivateKey, initializationVector, salt } =
          await requestEncryptPrivateKey(privateKey, password);

        const { password: hashedPassword } = await requestHashPassword(
          password,
          salt
        );

        dispatch(
          registerActions.setRsaKeyPairs({
            public: publicKey,
            enc_pri: encryptedPrivateKey,
            salt,
          })
        );
        dispatch(
          registerActions.setRegisterInfo({
            password: hashedPassword,
          })
        );
        setVector?.(initializationVector);
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
