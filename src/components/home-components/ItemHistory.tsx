import { useState } from "react";

import "../../assets/styles/text.css";
import "../../assets/styles/border.css";
import ItemAccessHistory from "./ItemAccessHistory";
import ItemShareHistory from "./ItemShareHistory";

const ItemHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAccessTab, setIsAccessTab] = useState(true);

  const CloseHistory = () => {
    setIsAccessTab(true);
    setIsOpen(!isOpen);
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
              <img src="src/assets/images/More.png" alt="More" className="" />
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
      {content}
    </div>
  );
};

export default ItemHistory;
