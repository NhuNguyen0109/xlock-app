import "../../assets/styles";
import { useState } from "react";

import AccessCard from "./AccessCard";
const DATA = [
  {
    title: "XLock",
    body: "account 1",
    date: "10:30, 04 Jul 2024",
  },
  {
    title: "XLock",
    body: "account 1",
    date: "10:30, 04 Jul 2024",
  },
  {
    title: "XLock",
    body: "account 1",
    date: "10:30, 04 Jul 2024",
  },
];

const AccessHistory = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [thisDevice, setThisDevice] = useState(false);
  const [thisBrowser, setThisBrowser] = useState(true);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <div className="access-history-section flex flex-col flex-grow overflow-hidden">
      <div className="header w-full h-[48px] bg-[#E6F1FD] flex items-center justify-between p-[12px]">
        <p className="title">Access History</p>
        <div
          className="w-[20px] h-[20px] flex justify-center items-center"
          onClick={toggleFilter}
        >
          <img src="src/assets/images/More.png" alt="More" className="" />
        </div>
      </div>
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] p-[12px] overflow-y-auto relative z-[1]">
        {openFilter && (
          <div className="w-[190px] h-[108px] rounded-[8px] box-shadow flex flex-col justify-between absolute top-0 right-0 z-[3] p-[16px]">
            <div
              className={`w-fit h-[31px] p-[8px] rounded-[99px] border-solid border-[1px] flex justify-between items-center ${
                thisDevice
                  ? "bg-[#E6F1FD] border-[#0570EB]"
                  : "bg-[#EFF0F0] border-[#C2C4C4]"
              }`}
              onClick={() => setThisDevice(!thisDevice)}
            >
              <p className="body-text">This device</p>
            </div>
            <div
              className={`w-fit h-[31px] p-[8px] rounded-[99px] border-solid border-[1px] flex justify-between items-center ${
                thisBrowser
                  ? "bg-[#E6F1FD] border-[#0570EB]"
                  : "bg-[#EFF0F0] border-[#C2C4C4]"
              }`}
              onClick={() => setThisBrowser(!thisBrowser)}
            >
              <p className="body-text">This browser</p>
            </div>
          </div>
        )}
        {DATA.map((item, index) => (
          <AccessCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AccessHistory;
