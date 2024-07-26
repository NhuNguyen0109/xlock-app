import SearchBar from "../search-bar/SearchBar";
import ItemCard from "./ItemCard";
import ItemType from "../../types/item.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/item.slice.ts";

const DATA: ItemType[] = [
  {
    id: "1",
    name: "XLock",
    account: "account 1",
    url: "https://example.org",
    description: "Conveniently scale focused paradigms.",
    credentials: "anngo",
    password: "12345",
    added_time: "2023-07-15",
    updated_time: "2023-07-15",
  },
  {
    id: "2",
    name: "Netflix",
    account: "account 1",
    url: "https://example.org",
    description: "Conveniently scale focused paradigms.",
    credentials: "ngohoangan",
    password: "678910",
    added_time: "2023-07-15",
    updated_time: "2023-07-15",
    shared: "nguyenvana",
  },
];

const ItemList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemActions.selectItem(DATA[0]));
  }, [dispatch]);

  // const { data, error, isLoading } = useQuery<ItemType[]>(
  //   "items",
  //   fetchItems,
  //   {
  //     onSuccess: (data) => {
  //       dispatch(itemActions.selectItem(data[0]));
  //     },
  //   }
  // );

  return (
    <div className="item-list-section flex flex-col flex-grow">
      <div className="header w-full h-[48px] p-[12px] bg-[#E6F1FD] flex items-center justify-between">
        <SearchBar data={DATA} />
        <div className="w-[24px] h-[24px] flex justify-center items-center">
          <img src="src/assets/images/New.png" alt="More" className="" />
        </div>
      </div>
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] mt-[6px]">
        {DATA.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
