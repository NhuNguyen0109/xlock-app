import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { itemActions } from "../../../store/item.slice.ts";
import { apiCall, ApiEndpoints } from "../../../utils/index.ts";
import { RootState } from "../../../store/index.ts";
import "../../../assets/styles";
import addOrderToAccounts from "../../../utils/orderAccount.ts";
import AccountType from "../../../types/item.ts";
import ItemCard from "./ItemCard";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );

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

  let itemsToRender = addOrderToAccounts(DATA);

  if (isSuccess) {
    itemsToRender = addOrderToAccounts(data);
  }

  if (isError) {
    console.log("Error in fetching items");
  }

  // Filter items based on the search query
  const filteredItems = useMemo(() => {
    return searchQuery.trim()
      ? itemsToRender.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.site.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : itemsToRender;
  }, [searchQuery, itemsToRender]);

  useEffect(() => {
    dispatch(itemActions.selectItem(itemsToRender[0]));
  }, [dispatch]);

  useEffect(() => {
    setSearchQuery("");
  }, [selectedItem]);

  return (
    <div className="item-list-section flex flex-col flex-grow">
      <div className="header w-full h-[48px] p-[12px] bg-[#E6F1FD] flex items-center justify-between">
        <div className="w-full mr-[16px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[24px] w-full rounded-[12px] px-[12px] inactive-title focus:outline-[#0570EB] body-text"
          />
        </div>
        <div className="w-[24px] h-[24px] flex justify-center items-center">
          <img src="/images/New.png" alt="More" className="" />
        </div>
      </div>
      <div className="access-history-list w-full h-full bg-white flex flex-col gap-[6px] mt-[6px] relative">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
        {filteredItems.length === 0 && (
          <p className="body-text-title text-center">No items found</p>
        )}
      </div>
    </div>
  );
};

export default ItemList;
