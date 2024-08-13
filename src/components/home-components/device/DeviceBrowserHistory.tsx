import "../../../assets/styles";
import { useQuery } from "@tanstack/react-query";
import DeviceCard from "./DeviceCard";
import DeviceType from "../../../types/device";
import { apiCall, ApiEndpoints } from "../../../utils";

const DATA = [
  {
    id: "1",
    device: "Windows",
    browser: "Chrome",
    date: "07:30, 12 Jul 2024",
    location: "Ho Chi Minh City, Vietnam",
    Ip: "0000:0000:0000:0000:0000:0000:0000:0000",
  },
  {
    id: "2",
    device: "Unknown device",
    browser: "Chrome",
    date: "07:30, 12 Jul 2024",
    location: "Ho Chi Minh City, Vietnam",
    Ip: "0000:0000:0000:0000:0000:0000:0000:0000",
  },
  {
    id: "3",
    device: "Unknown device",
    browser: "Edge",
    date: "07:30, 12 Jul 2024",
    location: "Ho Chi Minh City, Vietnam",
    Ip: "0000:0000:0000:0000:0000:0000:0000:0000",
  },
];

const DeviceBrowserHistory: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { data, isError } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const response = await apiCall<DeviceType[]>({
        endpoint: ApiEndpoints.GetDeviceHistory,
        method: "GET",
      });
      return response.data;
    },
  });

  if (isError) {
    console.log("Error in fetching device history");
  }

  return (
    <div className="w-[860px] h-fit rounded-[12px] bg-yellow z-[5] box-shadow overflow-hidden ">
      <div className="header h-[48px] w-full bg-[#E6F1FD] flex items-center px-[20px] justify-between">
        <p className="title">Your Devices and Browsers</p>
        <div
          className="w-[24px] h-[24px] flex justify-center items-center"
          onClick={closeModal}
        >
          <img src="src/assets/images/Close.png" alt="Close" className="" />
        </div>
      </div>
      <div className="content p-[20px] flex flex-col gap-[12px]">
        {(data ?? DATA).map((item) => (
          <DeviceCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DeviceBrowserHistory;
