import React, { useState, useRef, useEffect } from "react";
import SearchHistory from "./SearchHistory";
import { useSearchHistory } from "../../hooks/useSearchHistory";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();

  // 处理点击搜索框外部时隐藏历史记录
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsHistoryVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleInputFocus = () => {
    setIsHistoryVisible(true);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword);
      addToHistory(keyword);
      setIsHistoryVisible(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectHistory = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    onSearch(selectedKeyword);
    setIsHistoryVisible(false);
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="rounded-3xl w-full h-8 flex items-center box-border border border-neutral-300 px-4 text-xs">
        <input
          type="text"
          placeholder="搜索感兴趣的课程"
          className="flex-1 outline-none"
          value={keyword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
        />
        <button className="ml-2 cursor-pointer" onClick={handleSearch}>
          <svg
            className="w-4 h-4 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>

      <SearchHistory
        history={searchHistory}
        onSelect={handleSelectHistory}
        onClear={clearHistory}
        visible={isHistoryVisible}
      />
    </div>
  );
};

export default SearchBar;
