import "../../../assets/styles/";
import getUserAgent from "../../../utils/getUserAgent";

const CurrentDevice: React.FC<{
  openModal: () => void;
}> = ({ openModal }) => {
  const userAgent = getUserAgent();
  return (
    <div className="device-section flex flex-col">
      <div className="header w-full h-[48px] bg-[#E6F1FD] flex items-center justify-between p-[12px]">
        <p className="title">Current device</p>
        <div
          className="w-[24px] h-[24px] flex justify-center items-center"
          onClick={openModal}
        >
          <img src="/images/OpenTab.png" alt="OpenTab" className="" />
        </div>
      </div>
      <div className="device-card w-full h-[62px] bg-white flex gap-[12px] p-[12px]">
        <div className="w-[36px] h-[36px] flex justify-center">
          <img src="/images/Device.png" alt="Device" className="" />
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
