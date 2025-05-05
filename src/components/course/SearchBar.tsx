import React, { useState, useRef, useEffect } from "react";
import SearchHistory from "./SearchHistory";
import { useSearchHistory } from "../../hooks/useSearchHistory";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  initialKeyword?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialKeyword = "" }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { searchHistory, addToHistory, clearHistory, removeHistoryItem } = useSearchHistory();

  // 当initialKeyword变化时更新输入框内容
  useEffect(() => {
    if (initialKeyword !== keyword) {
      setKeyword(initialKeyword);
    }
  }, [initialKeyword]);

  // 处理点击搜索框外部时隐藏历史记录
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsHistoryVisible(false);
        setIsFocused(false);
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
    // 只有当有历史记录时才显示
    if (searchHistory.length > 0) {
      setIsHistoryVisible(true);
    }
    setIsFocused(true);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword);
      // 先添加到历史记录中
      addToHistory(keyword);
      // 在搜索后显示历史记录
      setIsHistoryVisible(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearInput = () => {
    setKeyword("");
  };

  const handleSelectHistory = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    onSearch(selectedKeyword);
    // 保持历史记录面板可见
    setIsHistoryVisible(true);
  };

  const handleRemoveHistoryItem = (index: number) => {
    removeHistoryItem(index);
    // 如果删除后没有历史记录了，就隐藏面板
    if (searchHistory.length <= 1) {
      setIsHistoryVisible(false);
    }
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <div 
        className={`rounded-3xl flex items-center box-border border border-neutral-300 px-4 text-xs ${
          isFocused ? "bg-white" : "bg-neutral-100"
        } hover:bg-white transition-colors duration-200`}
        style={{ width: "422px", height: "41.6px" }}
      >
        <input
          type="text"
          placeholder="搜索感兴趣的课程"
          className={`flex-1 outline-none ${isFocused ? "bg-neutral-100" : "bg-transparent"} rounded-2xl py-2 px-3`}
          value={keyword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
        />
        {keyword && (
          <button 
            className="ml-1 cursor-pointer text-neutral-400 hover:text-neutral-600" 
            onClick={handleClearInput}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
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
        onRemoveItem={handleRemoveHistoryItem}
        visible={isHistoryVisible && searchHistory.length > 0}
      />
    </div>
  );
};

export default SearchBar;
