import "../../assets/styles/text.css";
import "../../assets/styles/button.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { registerActions } from "../../store/register-info.slice";
import requestKeyPair from "../../utils/browserCall/request.key.pair";
import requestEncrypt from "../../utils/browserCall/request.encrypt.key";
import ButtonType from "../../types/button";
import requestHashPassword from "../../utils/browserCall/request.hash";
// import { storeConcatStr } from "../../utils/concat-text";

const GenerateKey: React.FC<ButtonType> = ({ handleNextStep }) => {
  const dispatch = useDispatch();
  const password = useSelector((state: RootState) => state.register.password);

  useEffect(() => {
    const generateKeyPair = async () => {
      try {
        const { privateKey, publicKey } = await requestKeyPair();
        const { concatenatedData, salt } = await requestEncrypt(
          privateKey,
          password
        );

        const { password: hashedPassword } = await requestHashPassword(
          password,
          salt
        );

        dispatch(
          registerActions.setRsaKeyPairs({
            public: publicKey,
            enc_pri: concatenatedData,
            salt,
          })
        );
        dispatch(
          registerActions.setRegisterInfo({
            password: hashedPassword,
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
        Our app will generate a unique encryption key pair to enhance your
        account security and protect your sensitive data.
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
