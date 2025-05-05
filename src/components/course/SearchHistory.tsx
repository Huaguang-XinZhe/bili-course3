import React, { useState, useEffect } from "react";
import { useSearchHistory } from "../../hooks/useSearchHistory";

interface SearchHistoryProps {
  history: string[];
  onSelect: (keyword: string) => void;
  onClear: () => void;
  visible: boolean;
  onRemoveItem?: (index: number) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelect,
  onClear,
  visible,
  onRemoveItem,
}) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [localHistory, setLocalHistory] = useState<string[]>([]);
  const { removeHistoryItem } = useSearchHistory();

  // 同步历史记录到本地状态
  useEffect(() => {
    setLocalHistory(history);
  }, [history]);

  // 每次显示或隐藏时，重置悬停状态
  useEffect(() => {
    setHoveredItem(null);
  }, [visible]);

  // 如果不可见，则不渲染
  if (!visible) return null;

  const handleRemoveItem = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // 阻止冒泡，避免触发onSelect
    e.preventDefault(); // 防止其他事件
    
    // 立即从本地状态中移除，提供即时反馈
    const newHistory = [...localHistory];
    newHistory.splice(index, 1);
    setLocalHistory(newHistory);
    
    // 如果提供了外部删除处理器就使用它，否则使用内部的
    if (onRemoveItem) {
      onRemoveItem(index);
    } else {
      removeHistoryItem(index);
    }
  };

  return (
    <div
      className="text-neutral-800 border-b-zinc-200 border-b-2 border-l-zinc-200 border-l-2 border-r-zinc-200 border-r-2 text-xs pb-4 pt-3.5 rounded-lg absolute w-full bg-white z-10 mt-1"
      style={{
        borderBottomStyle: "solid",
        borderLeftStyle: "solid",
        borderRightStyle: "solid",
      }}
    >
      <div>
        <div className="items-center justify-between px-4 flex">
          <div className="text-lg">搜索历史</div>
          {localHistory.length > 0 && (
            <div
              className="text-zinc-400 cursor-pointer hover:text-zinc-600"
              onClick={onClear}
            >
              清空
            </div>
          )}
        </div>
        <div className="px-4 text-zinc-900 mt-4">
          {localHistory.length > 0 ? (
            <div className="flex-wrap flex gap-2">
              {localHistory.map((item, index) => (
                <div
                  key={`history-${index}-${item}`}
                  className="bg-neutral-100 cursor-pointer py-2 px-3 rounded hover:bg-neutral-200 relative group transition-colors"
                  onClick={() => onSelect(item)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div 
                    className={`text-ellipsis transition-colors ${
                      hoveredItem === index ? "text-[#00A1D6]" : ""
                    }`}
                  >
                    {item}
                  </div>
                  {hoveredItem === index && (
                    <button 
                      type="button"
                      className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm hover:bg-neutral-200 z-20 cursor-pointer border border-neutral-200"
                      onClick={(e) => handleRemoveItem(e, index)}
                      aria-label="删除"
                    >
                      <svg
                        className="w-3 h-3 text-neutral-500"
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-400 py-4">
              暂无搜索历史，搜索后将在此显示
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
