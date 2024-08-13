import "../../../assets/styles";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiCall, ApiEndpoints } from "../../../utils";
import useModal from "../../../utils/useModal";
import FilterPopup from "../../filter/FilterPopup";
import AccessCard from "./AccessCard";
import HistoryType from "../../../types/history";

const DATA = [
  {
    id: "1",
    name: "XLock",
    filling_date: "10:30, 04 Jul 2024",
  },
];

const AccessHistory = () => {
  const { isOpen, openModal, closeModal, modalRef, buttonRef } = useModal();
  const [thisDevice, setThisDevice] = useState(false);
  const [thisBrowser, setThisBrowser] = useState(true);
  let itemsToRender = DATA;

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await apiCall<HistoryType[], undefined>({
        endpoint: ApiEndpoints.GetHistory,
        method: "GET",
      });
      return response.data;
    },
  });

  if (isSuccess) itemsToRender = data;

  if (isError) {
    console.log("Error in fetching filling history");
  }

  return (
    <div className="access-history-section flex flex-col flex-grow overflow-hidden">
      <div className="header w-full h-[48px] bg-[#E6F1FD] flex items-center justify-between p-[12px]">
        <p className="title">Access History</p>
        <div
          className="w-[20px] h-[20px] flex justify-center items-center"
          onClick={isOpen ? closeModal : openModal}
          ref={buttonRef}
        >
          <img src="/images/More.png" alt="More" className="" />
        </div>
      </div>
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] p-[12px] overflow-y-auto relative z-[1]">
        {isOpen && (
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
        {itemsToRender.map((item, index) => (
          <AccessCard
            key={item.id ?? index}
            title={item.name}
            body={""}
            date={item.filling_date}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessHistory;
