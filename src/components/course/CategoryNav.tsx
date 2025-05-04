import React from "react";
import { Category } from "../../services/api";

interface CategoryNavProps {
  categories: Category[];
  onSelect: (id: number) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onSelect }) => {
  return (
    <div className="overflow-hidden">
      <ul className="flex flex-wrap">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer py-1 px-4 mr-3 mb-3 border rounded-lg text-center transition-colors ${
              category.active
                ? "border-teal-500 text-teal-500"
                : "border-neutral-300 text-neutral-600 hover:border-teal-500 hover:text-teal-500"
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
