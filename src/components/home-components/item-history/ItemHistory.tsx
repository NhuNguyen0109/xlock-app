import { useState, useEffect } from "react";
import useModal from "../../../utils/useModal";
import "../../../assets/styles";
import ItemAccessHistory from "./ItemAccessHistory";
import ItemShareHistory from "./ItemShareHistory";
import FilterPopup from "../../filter/FilterPopup";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const ItemHistory = () => {
  const {
    modalRef,
    isOpen: openFilter,
    closeModal,
    openModal,
    buttonRef,
  } = useModal();
  const [isOpen, setIsOpen] = useState(true);
  const [isAccessTab, setIsAccessTab] = useState(true);
  const [thisDevice, setThisDevice] = useState(false);
  const [thisBrowser, setThisBrowser] = useState(true);
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );

  useEffect(() => {
    if (selectedItem.id === "") {
      setIsOpen(false);
    } else setIsOpen(true);
  }, [selectedItem]);

  const CloseHistory = () => {
    if (selectedItem.id !== "") {
      setIsAccessTab(true);
      setIsOpen(!isOpen);
      closeModal();
    }
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
          <div
            className="w-[20px] h-[20px] flex justify-center items-center"
            ref={buttonRef}
          >
            {isOpen && (
              <img
                src="/images/More.png"
                alt="More"
                className=""
                onClick={openFilter ? closeModal : openModal}
              />
            )}
          </div>
          <div
            className="w-[20px] h-[20px] flex justify-center items-center "
            onClick={CloseHistory}
          >
            <img
              src="/images/CloseTab.png"
              alt="CloseTab"
              className={`${!isOpen ? "rotate-180" : null}`}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        {openFilter && (
          <div
            className="w-fit h-fit absolute top-0 right-0 z-[3]"
            ref={modalRef}
          >
            <FilterPopup
              thisBrowser={thisBrowser}
              thisDevice={thisDevice}
              toggleBrowser={() => setThisBrowser(!thisBrowser)}
              toggleDevice={() => setThisDevice(!thisDevice)}
            />
          </div>
        )}
      </div>
      {content}
    </div>
  );
};

export default ItemHistory;
