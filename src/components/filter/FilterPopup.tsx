import "../../assets/styles";

interface FilterOptions {
  thisDevice: boolean;
  thisBrowser: boolean;
  toggleDevice: () => void;
  toggleBrowser: () => void;
}

const FilterPopup: React.FC<FilterOptions> = ({
  thisDevice,
  thisBrowser,
  toggleDevice,
  toggleBrowser,
}) => {
  return (
    <div className="w-[190px] h-[108px] rounded-[8px] box-shadow flex flex-col justify-between p-[16px]">
      <div
        className={`w-fit h-[31px] p-[8px] rounded-[99px] border-solid border-[1px] flex justify-between items-center hover:cursor-pointer ${
          thisDevice
            ? "bg-[#E6F1FD] border-[#0570EB]"
            : "bg-[#EFF0F0] border-[#C2C4C4]"
        }`}
        onClick={toggleDevice}
      >
        <p className="body-text">This device</p>
      </div>
      <div
        className={`w-fit h-[31px] p-[8px] rounded-[99px] border-solid border-[1px] flex justify-between items-center hover:cursor-pointer ${
          thisBrowser
            ? "bg-[#E6F1FD] border-[#0570EB]"
            : "bg-[#EFF0F0] border-[#C2C4C4]"
        }`}
        onClick={toggleBrowser}
      >
        <p className="body-text">This browser</p>
      </div>
    </div>
  );
};

export default FilterPopup;
