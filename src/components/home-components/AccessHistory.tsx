import "../../assets/styles/text.css";

import AccessCard from "./AccessCard";
const DATA = [
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
  {
    browser: "Chrome",
    device: "Window",
    date: "12334455676788434",
  },
];

const AccessHistory = () => {
  return (
    <div className="access-history-section flex flex-col flex-grow overflow-hidden">
      <div className="header w-full h-[48px] bg-[#E6F1FD] flex items-center justify-between p-[12px]">
        <p className="title">Access History</p>
        <div className="w-[20px] h-[20px] flex justify-center items-center">
          <img src="src/assets/images/More.png" alt="More" className="" />
        </div>
      </div>
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] p-[12px] overflow-y-auto">
        {DATA.map((item, index) => (
          <AccessCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AccessHistory;
