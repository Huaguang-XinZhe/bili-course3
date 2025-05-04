import { useState, useEffect } from "react";

const STORAGE_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 从本地存储加载历史记录
  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      } catch (e) {
        console.error("Failed to parse search history:", e);
      }
    }
  }, []);

  // 添加搜索历史
  const addToHistory = (keyword: string) => {
    if (!keyword.trim()) return;

    setSearchHistory((prevHistory) => {
      // 移除已存在的相同关键词（如果有）
      const filteredHistory = prevHistory.filter((item) => item !== keyword);
      // 在数组开头添加新的关键词
      const newHistory = [keyword, ...filteredHistory].slice(
        0,
        MAX_HISTORY_ITEMS
      );
      // 保存到本地存储
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 清空搜索历史
  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory,
  };
};
