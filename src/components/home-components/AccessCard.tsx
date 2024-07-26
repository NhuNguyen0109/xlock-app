import React from "react";

import "../../assets/styles/text.css";

interface AccessCardProps {
  device: string;
  browser: string;
  date?: string;
  imageUrl?: string;
}

const AccessCard: React.FC<AccessCardProps> = ({
  device,
  browser,
  date,
  imageUrl,
}) => {
  return (
    <div className="device-card w-full h-[62px] bg-white flex gap-[12px]">
      <div className="w-[32px] h-[32px] flex justify-center">
        <img
          src={`${imageUrl ? imageUrl : "src/assets/images/DefaultLogo.png"}`}
          alt="DefaultLogo"
          className=""
        />
      </div>
      <div className="flex flex-col">
        <p className="body-text-bold">{device}</p>
        <p className="body-text">{browser}</p>
        <p className="body-text-light">{date}</p>
      </div>
    </div>
  );
};

export default AccessCard;
