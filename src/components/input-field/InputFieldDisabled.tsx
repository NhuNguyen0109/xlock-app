import { useState } from "react";
import "../../assets/styles/text.css";
import "../../assets/styles/border.css";
import { DisabledInputType } from "../../types/input-field";

const InputFieldDisabled: React.FC<DisabledInputType> = ({
  title,
  value,
  src,
  alt,
  actualValue,
}) => {
  const isUrlText = isUrl(value);

  const [isCopy, setIsCopy] = useState(src || undefined);

  const handleCopy = () => {
    copyContent(actualValue ?? value);
    setIsCopy("src/assets/images/Success.png");
    setTimeout(() => setIsCopy(src || undefined), 2000);
  };

  return (
    <div className="h-[24px] w-full flex justify-between items-center gap-[20px]">
      <p className="body-text w-[100px] flex justify-end items-center">
        {title}
      </p>
      <div className="min-w-[220px]">
        <p className="body-text">
          {isUrlText ? <a href={value}>{value}</a> : value}
        </p>
      </div>
      <div className="w-[16px] h-[16px] flex justify-center items-center">
        <img src={isCopy || undefined} alt={alt} onClick={handleCopy} />
      </div>
    </div>
  );
};

const copyContent = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const isUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch (e) {
    return false;
  }
};

export default InputFieldDisabled;
