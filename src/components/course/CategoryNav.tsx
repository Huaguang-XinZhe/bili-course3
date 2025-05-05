import React from "react";
import { Category } from "../../type";

interface CategoryNavProps {
  categories: Category[];
  onSelect: (id: number) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onSelect }) => {
  return (
    <div className="overflow-hidden mb-4">
      <ul className="flex justify-between w-full">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer py-2 px-4 text-center transition-colors relative text-[14px] ${
              category.active
                ? "text-[#00A1D6] font-medium after:content-[''] after:absolute after:left-1/2 after:w-8 after:-ml-4 after:bottom-0 after:h-[2px] after:bg-[#00A1D6]"
                : "text-neutral-600 hover:text-[#00A1D6]"
            }`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
