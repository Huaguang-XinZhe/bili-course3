import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}) => {
  const [inputPage, setInputPage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
      setInputPage("");
    }
  };

  // 渲染页码按钮
  const renderPageButtons = () => {
    const buttons = [];

    // 始终显示前三页
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      buttons.push(
        <li key={i} className="inline-block m-0 text-gray-500">
          <button
            className={`cursor-pointer float-left px-3.5 text-center w-9 h-10 min-w-[0.94rem] m-1 overflow-visible border-2 ${
              currentPage === i
                ? "bg-teal-500 text-white border-teal-500"
                : "border-zinc-200 text-gray-500"
            } border-solid rounded`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    // 如果总页数大于 3，添加省略号
    if (totalPages > 3) {
      buttons.push(
        <strong
          key="ellipsis"
          className="text-gray-400 px-3 inline-block m-1 rounded"
        >
          ...
        </strong>
      );

      // 显示最后一页
      buttons.push(
        <li key={totalPages} className="inline-block m-0 text-gray-500">
          <button
            className={`cursor-pointer float-left px-3.5 text-center w-11 h-10 min-w-[0.94rem] m-1 overflow-visible border-2 ${
              currentPage === totalPages
                ? "bg-teal-500 text-white border-teal-500"
                : "border-zinc-200 text-gray-500"
            } border-solid rounded`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );

      // 添加下一页按钮
      buttons.push(
        <li key="next" className="inline-block m-0 text-gray-500">
          <button
            className="cursor-pointer float-left px-3.5 text-center h-10 min-w-[0.94rem] m-1 overflow-visible border-2 border-zinc-200 border-solid rounded"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          >
            下一页
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <div
      className={`w-full my-0 mx-auto mb-10 min-[1400px]:w-[77.06rem] ${className}`}
    >
      <div className="text-neutral-800 text-xs w-full overflow-hidden">
        <ul className="align-middle inline-block list-none m-0 text-sm font-bold">
          {renderPageButtons()}
        </ul>
        <div className="text-gray-400 float-right px-1 h-10 m-0">
          <div className="inline-block m-0">共 {totalPages} 页 ，</div>
          跳至
          <input
            className="cursor-text px-3 text-center inline-block w-8 h-6 mt-1.5 mx-1 mb-0 overflow-visible border-2 border-neutral-300 border-solid rounded"
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          页
        </div>
      </div>
    </div>
  );
};

export default Pagination;
