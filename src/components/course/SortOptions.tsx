import React from "react";
import { SortOption as ApiSortOption } from "../../services/api";

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
    <div className="flex items-center my-4">
      <span className="mr-2 text-neutral-500">排序：</span>
      <div className="flex">
        {options.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer mr-4 ${
              option.active ? "text-teal-500" : "text-neutral-500"
            }`}
            onClick={() => onSelect(option.id)}
          >
            <span className="transition-colors hover:text-teal-500">
              {option.title || option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
