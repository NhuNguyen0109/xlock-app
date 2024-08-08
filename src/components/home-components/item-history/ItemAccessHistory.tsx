import AccessCard from "../history/AccessCard";
const DATA = [
  {
    title: "Unknown device",
    body: "Chrome",
    date: "10:30, 04 Jul 2024",
  },
  {
    title: "Unknown device",
    body: "Chrome",
    date: "10:30, 04 Jul 2024",
  },
  {
    title: "Unknown device",
    body: "Chrome",
    date: "10:30, 04 Jul 2024",
  },
  {
    title: "Unknown device",
    body: "Chrome",
    date: "10:30, 04 Jul 2024",
  },
];

const ItemAccessHistory = () => {
  return (
    <div className="access-history w-full h-[200px] flex flex-col">
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[17px] p-[12px] overflow-y-auto ">
        {DATA.map((item, index) => (
          <AccessCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemAccessHistory;
