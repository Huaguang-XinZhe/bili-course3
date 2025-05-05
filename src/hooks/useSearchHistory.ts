import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  // 使用ref保存已删除项的引用，确保它们在组件生命周期内不会重新出现
  const deletedItemsRef = useRef<Set<string>>(new Set());
  // 使用ref记录最后一次操作时间，用于判断是否需要重新加载历史记录
  const lastOperationTimeRef = useRef<number>(Date.now());

  // 从本地存储加载历史记录
  const loadHistory = useCallback(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          // 过滤掉已删除的项
          const filteredHistory = parsedHistory.filter(
            (item) => !deletedItemsRef.current.has(item)
          );
          setSearchHistory(filteredHistory);
          // 更新存储以保持同步
          if (filteredHistory.length !== parsedHistory.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
          }
        }
      } catch (e) {
        console.error("Failed to parse search history:", e);
      }
    } else {
      setSearchHistory([]);
    }
  }, []);

  useEffect(() => {
    loadHistory();
    
    // 添加事件监听器以处理其他标签页的更新
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        // 只有当其他地方的修改比本地最后一次操作更晚时才更新
        if (Date.now() - lastOperationTimeRef.current > 100) {
          loadHistory();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadHistory]);

  // 添加搜索历史
  const addToHistory = useCallback((keyword: string) => {
    if (!keyword.trim()) return;
    
    // 记录操作时间
    lastOperationTimeRef.current = Date.now();
    
    // 即使在被删除列表中，也允许重新添加（这是新需求）
    // 但首先从删除列表中移除这个关键词，以便将来它不会被自动过滤
    deletedItemsRef.current.delete(keyword);

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
  }, []);

  // 删除单个历史记录项
  const removeHistoryItem = useCallback((index: number) => {
    // 记录操作时间
    lastOperationTimeRef.current = Date.now();
    
    setSearchHistory((prevHistory) => {
      if (index < 0 || index >= prevHistory.length) return prevHistory;
      
      // 记录被删除的项
      const itemToRemove = prevHistory[index];
      deletedItemsRef.current.add(itemToRemove);
      
      const newHistory = [...prevHistory];
      newHistory.splice(index, 1);
      // 保存到本地存储
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  // 清空搜索历史
  const clearHistory = useCallback(() => {
    // 记录操作时间
    lastOperationTimeRef.current = Date.now();
    
    // 将所有当前历史记录添加到已删除集合中
    searchHistory.forEach(item => {
      deletedItemsRef.current.add(item);
    });
    
    localStorage.removeItem(STORAGE_KEY);
    setSearchHistory([]);
  }, [searchHistory]);

  return {
    searchHistory,
    addToHistory,
    removeHistoryItem,
    clearHistory,
  };
};
