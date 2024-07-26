import "../../assets/styles/text.css";
import getUserAgent from "../../utils/getUserAgent";

const CurrentDevice = () => {
  const userAgent = getUserAgent();
  return (
    <div className="device-section flex flex-col">
      <div className="header w-full h-[48px] bg-[#E6F1FD] flex items-center justify-between p-[12px]">
        <p className="title">Current device</p>
        <div className="w-[24px] h-[24px] flex justify-center items-center">
          <img src="src/assets/images/OpenTab.png" alt="OpenTab" className="" />
        </div>
      </div>
      <div className="device-card w-full h-[62px] bg-white flex gap-[12px] p-[12px]">
        <div className="w-[36px] h-[36px] flex justify-center">
          <img src="src/assets/images/Device.png" alt="Device" className="" />
        </div>
        <div className="flex flex-col">
          <p className="body-text-bold">{userAgent?.device}</p>
          <p className="body-text">{userAgent?.browser}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentDevice;
