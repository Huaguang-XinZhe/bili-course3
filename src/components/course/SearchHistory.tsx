import React from "react";

interface SearchHistoryProps {
  history: string[];
  onSelect: (keyword: string) => void;
  onClear: () => void;
  visible: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelect,
  onClear,
  visible,
}) => {
  if (!visible || history.length === 0) return null;

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
          <div
            className="text-zinc-400 cursor-pointer hover:text-zinc-600"
            onClick={onClear}
          >
            清空
          </div>
        </div>
        <div className="px-4 text-zinc-900 mt-4">
          <div className="flex-wrap flex gap-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-neutral-100 cursor-pointer py-2 px-3 rounded hover:bg-neutral-200"
                onClick={() => onSelect(item)}
              >
                <div className="text-ellipsis">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
