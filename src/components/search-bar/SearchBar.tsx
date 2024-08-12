import React from "react";

import "../../assets/styles/text.css";

type SearchProps = {
  data: object;
};

const SearchBar: React.FC<SearchProps> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="h-[24px] rounded-[12px] px-[12px] inactive-title"
      />
      <div>
        {/* {Object.values(data).map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default SearchBar;
