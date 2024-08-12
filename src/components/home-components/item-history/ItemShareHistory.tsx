import "../../../assets/styles/";
import AccessCard from "../history/AccessCard";
const DATA = [
  {
    device: "Unknown device",
    browser: "Chrome",
    date: "10:30, 04 Jul 2024",
    with: [
      "nguyenvana@gmail.com",
      "nguyenthib@gmail.com",
      "nguyenvanc@gmail.com",
    ],
  },
  {
    device: "Unknown device",
    browser: "Chrome",
    date: "10:30, 04 Jul 2024",
    with: ["nguyenvana@gmail.com"],
  },
];

const ItemShareHistory = () => {
  return (
    <div className="access-history w-full h-[200px] flex flex-col">
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] p-[12px] overflow-y-auto">
        {/* <div className="flex justify-between w-full test-border"> */}
        {DATA.map((item, index) => (
          <div key={index} className="w-full flex justify-between">
            <div className="w-[50%] ">
              <AccessCard
                key={index}
                title={item.device}
                body={item.browser}
                date={item.date}
              />
            </div>
            <div className="w-[50%] flex flex-col ">
              <p className="body-text-bold">With</p>
              {item.with.length <= 2 && (
                <>
                  <p className="body-text">{item.with[0]}</p>
                  <p className="body-text">{item.with[1]}</p>
                </>
              )}
              {item.with.length > 2 && (
                <>
                  <p className="body-text">More than two people</p>
                </>
              )}
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ItemShareHistory;
