import { useState } from "react";

import "../../assets/styles/text.css";
import "../../assets/styles/border.css";
import ItemAccessHistory from "./ItemAccessHistory";
import ItemShareHistory from "./ItemShareHistory";

const ItemHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAccessTab, setIsAccessTab] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [thisDevice, setThisDevice] = useState(false);
  const [thisBrowser, setThisBrowser] = useState(true);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const CloseHistory = () => {
    setIsAccessTab(true);
    setIsOpen(!isOpen);
    setOpenFilter(false);
  };

  let content =
    isOpen && isAccessTab ? (
      <ItemAccessHistory />
    ) : isOpen && !isAccessTab ? (
      <ItemShareHistory />
    ) : null;

  return (
    <div className="item-history-section flex flex-col">
      <div className="header w-full h-[48px] bg-[#E6F1FD] flex items-center justify-between">
        <div className="tab-section h-full flex">
          <div
            className={`tab-access-history w-[180px] h-full flex justify-center items-center ${
              isOpen && isAccessTab
                ? "border-solid border-b-[2px] border-[#0157B9]"
                : null
            }`}
            onClick={() => setIsAccessTab(true)}
          >
            <p
              className={`${
                isOpen && isAccessTab ? "title" : "inactive-title"
              }`}
            >
              Access History
            </p>
          </div>
          <div
            className={`tab-share-history w-[180px] h-full flex justify-center items-center ${
              isOpen && !isAccessTab
                ? "border-solid border-b-[2px] border-[#0157B9]"
                : null
            }`}
            onClick={() => setIsAccessTab(false)}
          >
            <p
              className={`${
                isOpen && !isAccessTab ? "title" : "inactive-title"
              }`}
            >
              Share History
            </p>
          </div>
        </div>
        <div className="button-section w-[80px] h-full flex items-center justify-between px-[12px]">
          <div className="w-[20px] h-[20px] flex justify-center items-center">
            {isOpen && (
              <img
                src="src/assets/images/More.png"
                alt="More"
                className=""
                onClick={toggleFilter}
              />
            )}
          </div>
          <div
            className="w-[20px] h-[20px] flex justify-center items-center "
            onClick={CloseHistory}
          >
            <img
              src="src/assets/images/CloseTab.png"
              alt="CloseTab"
              className={`${!isOpen ? "rotate-180" : null}`}
            />
          </div>
        </div>
      </div>

      <div className="relative z-[1]">
        {openFilter && (
          <div className="w-[190px] h-[108px] rounded-[8px] box-shadow flex flex-col justify-between absolute top-0 right-12 z-[3] p-[16px]">
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
        {content}
      </div>
    </div>
  );
};

export default ItemHistory;
