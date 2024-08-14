import { useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import AccountType from "../../types/item";
import "../../assets/styles";

type SearchProps = {};

const SearchBar: React.FC<SearchProps> = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Retrieve items from the query client
  const itemList = queryClient.getQueryData<AccountType[]>(["items"]) || [];

  // Filter items based on the search query
  const filteredItems = useMemo(() => {
    return searchQuery.trim()
      ? itemList.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  }, [searchQuery, itemList]);

  return (
    <div className="w-full mr-[16px]">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-[24px] w-full rounded-[12px] px-[12px] inactive-title focus:outline-[#0570EB] body-text"
      />
      <div className="absolute">
        {searchQuery.trim() && filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          ))
        ) : searchQuery.trim() ? (
          <p>No items found</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
