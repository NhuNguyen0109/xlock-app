import "../../../assets/styles";
import AccessCard from "../history/AccessCard";
import DeviceType from "../../../types/device";
import getUserAgent from "../../../utils/getUserAgent";

const DeviceCard: React.FC<DeviceType> = (props) => {
  const currentDevice = checkCurrentDevice(props.device, props.browser);

  const handleRemove = () => {};

  const content = currentDevice ? (
    <p className="body-text-bold">Current device</p>
  ) : (
    <button
      className="border-solid border-[1px] border-[#E60000] rounded-[4px] py-[4px] px-[8px] h-fit
              text-[#E60000] text-xs not-italic font-normal leading-[normal]"
      onClick={handleRemove}
    >
      Remove
    </button>
  );

  return (
    <div className="w-full flex justify-between">
      <div className="device-content flex gaps-[12px] w-full items-end">
        <div className="h-full w-[230px]">
          <AccessCard
            title={props.device}
            body={props.browser}
            date={currentDevice ? "Now" : props.date}
            imageUrl="/images/device.png"
          />
        </div>
        <div className="flex h-full justify-center items-end  pb-[8px]">
          <div className="flex flex-col">
            <p className="body-text">{props.location}</p>
            <p className="body-text-light">{props.Ip}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">{content}</div>
    </div>
  );
};

const checkCurrentDevice = (device: string, browser: string) => {
  const userAgent = getUserAgent();
  return device === userAgent?.device && browser === userAgent?.browser;
};

export default DeviceCard;
