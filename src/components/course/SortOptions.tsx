import React from "react";
import { SortOption as ApiSortOption } from "../../type";

// 扩展 API 中的 SortOption 类型，以适配组件需求
interface SortOption extends ApiSortOption {
  name?: string; // 兼容旧的接口
}

interface SortOptionsProps {
  options: SortOption[];
  onSelect: (id: number) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="flex items-center">
      <span className="mr-3 text-neutral-500 text-sm font-medium">
        排序：
      </span>
      <div className="flex">
        {options.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer mr-5 ${
              option.active ? "text-[#00A1D6] font-medium" : "text-neutral-500"
            }`}
            style={{ fontSize: "14px" }}
            onClick={() => onSelect(option.id)}
          >
            <span className="transition-colors hover:text-[#00A1D6]">
              {option.title || option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
