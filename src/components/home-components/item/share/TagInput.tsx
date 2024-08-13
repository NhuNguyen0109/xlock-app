import React, { useState } from "react";
import "../../../../assets/styles";

const TagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (inputValue.trim().length > 0) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTag();
    }
  };

  const handleInputBlur = () => {
    handleAddTag();
  };

  return (
    <div id="emailInputContainer" className="w-full">
      <input
        className="border-solid border-[2px] border-[#D1D3D3] w-full h-[40px] bg-white px-[12px] rounded-[6px] body-text"
        // autoFocus
        placeholder="Email address or Username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
      <div
        className={`w-full flex flex-wrap gap-x-[4px] gap-y-[4px] ${
          tags.length === 0 ? null : "mt-[12px]"
        }`}
      >
        {tags.map((tag, index) => (
          <span
            className="flex w-fit h-fit items-center gap-[8px] py-[4px] px-[8px] bg-[#E6F1FD] rounded-[4px] body-text text-[#29428D]"
            key={index}
          >
            {tag}
            <div
              className="w-[14px] h-[14px] flex justify-center items-center "
              onClick={() => handleRemoveTag(index)}
            >
              <img src="/images/CloseBlue.png" alt="Close" />
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
