import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { itemActions } from "../../../store/item.slice.ts";
import { loginActions } from "../../../store/login.slice.ts";
import { apiCall, ApiEndpoints } from "../../../utils/index.ts";
import { RootState } from "../../../store/index.ts";
import "../../../assets/styles";
import addOrderToAccounts from "../../../utils/orderAccount.ts";
import AccountType from "../../../types/item.ts";
import ItemCard from "./ItemCard";
import { PersonalKeyType } from "../../../types/key.ts";

const defaultItem = {
  name: "",
  site: "",
  description: "",
  enc_credentials: "",
  logo_url: "",
  id: "",
  added_at: "",
  updated_at: "",
  type: "",
};

const ItemList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [itemsToRender, setItemsToRender] = useState<AccountType[]>([]);
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

  const { data: enc_pri, isSuccess: enc_pri_success } = useQuery({
    queryKey: ["enc_pri"],
    queryFn: async () => {
      const response = await apiCall<PersonalKeyType, undefined>({
        endpoint: `${ApiEndpoints.GetKey}me`,
        method: "GET",
      });
      return response.data.enc_pri;
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setItemsToRender(addOrderToAccounts(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (enc_pri && enc_pri_success) {
      dispatch(loginActions.setEncPri(enc_pri));
    }
  }, [enc_pri, enc_pri_success]);

  useLayoutEffect(() => {
    if (itemsToRender.length > 0) {
      dispatch(itemActions.selectItem(itemsToRender[0]));
    }
  }, [dispatch, itemsToRender]);

  if (isError) {
    console.log("Error in fetching items");
  }

  // useLayoutEffect(() => {
  //   if (isSuccess && data) {
  //     const updatedItems = addOrderToAccounts(data);
  //     setItemsToRender(updatedItems);
  //     if (updatedItems.length > 0) {
  //       dispatch(itemActions.selectItem(updatedItems[0]));
  //     }
  //   }
  // }, [isSuccess, data, dispatch]);

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
    setSearchQuery("");
  }, [selectedItem]);

  const handleCreateItem = () => {
    dispatch(itemActions.selectItem(defaultItem));
    dispatch(itemActions.setISCreatingTrue());
  };

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
        <div
          className="w-[24px] h-[24px] flex justify-center items-center"
          onClick={handleCreateItem}
        >
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
