import SearchBar from "../../search-bar/SearchBar.tsx";
import ItemCard from "./ItemCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { itemActions } from "../../../store/item.slice.ts";
import { apiCall, ApiEndpoints } from "../../../utils/index.ts";
import addOrderToAccounts from "../../../utils/orderAccount.ts";
import AccountType from "../../../types/item.ts";

let DATA: AccountType[] = [
  {
    id: "1",
    name: "XLock",
    site: "https://example.org",
    description: "Conveniently scale focused paradigms.",
    enc_credentials: "anngo",
    added_at: "2023-07-15",
    updated_at: "2023-07-15",
    logo_url: "",
    type: "personal_item",
  },
  {
    id: "2",
    name: "Netflix",
    site: "https://example.org",
    description: "Conveniently scale focused paradigms.",
    enc_credentials: "anngo",
    added_at: "2023-07-15",
    updated_at: "2023-07-15",
    logo_url: "",
    type: "personal_item",
  },
];

const ItemList = () => {
  const dispatch = useDispatch();
  let itemsToRender = addOrderToAccounts(DATA);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await apiCall<AccountType[], undefined>({
        endpoint: ApiEndpoints.GetListItems,
        method: "GET",
      });
      return response.data;
    },
  });

  if (isSuccess) {
    itemsToRender = addOrderToAccounts(data);
  }

  if (isError) {
    console.log("Error in fetching items");
  }

  useEffect(() => {
    // if (data.length > 0) {
    //   dispatch(itemActions.selectItem(data[0]));
    // } else {
    //   dispatch(itemActions.selectItem(DATA[0]));
    // }
    dispatch(itemActions.selectItem(itemsToRender[0]));
  }, [dispatch, data]);

  return (
    <div className="item-list-section flex flex-col flex-grow">
      <div className="header w-full h-[48px] p-[12px] bg-[#E6F1FD] flex items-center justify-between">
        <SearchBar data={itemsToRender} />
        <div className="w-[24px] h-[24px] flex justify-center items-center">
          <img src="src/assets/images/New.png" alt="More" className="" />
        </div>
      </div>
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] mt-[6px]">
        {itemsToRender.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
