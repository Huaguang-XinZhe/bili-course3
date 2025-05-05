import React, { useState, useEffect } from "react";

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
  const [showJumpSuccess, setShowJumpSuccess] = useState<boolean>(false);
  const [showJumpError, setShowJumpError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("页码无效");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 只允许输入数字
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setInputPage(value);
    }
    // 当用户开始输入新的值时，隐藏所有提示
    setShowJumpError(false);
    setShowJumpSuccess(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber)) {
        // 确保页码在有效范围内
        const validPage = Math.max(1, Math.min(pageNumber, totalPages));
        
        if (validPage !== pageNumber) {
          // 显示错误提示，输入的页码超出范围
          setErrorMessage(`页码超出范围 (1-${totalPages})`);
          setShowJumpError(true);
          setShowJumpSuccess(false);
          setTimeout(() => {
            setShowJumpError(false);
          }, 1500);
        } else {
          // 正常跳转
          onPageChange(validPage);
          setShowJumpSuccess(true);
          setShowJumpError(false);
          setTimeout(() => {
            setShowJumpSuccess(false);
          }, 1500);
        }
      } else {
        // 显示错误提示
        setErrorMessage("页码无效");
        setShowJumpError(true);
        setShowJumpSuccess(false);
        setTimeout(() => {
          setShowJumpError(false);
        }, 1500);
      }
      setInputPage("");
    }
  };

  // 每当当前页面变化时，隐藏所有提示
  useEffect(() => {
    setShowJumpSuccess(false);
    setShowJumpError(false);
  }, [currentPage]);

  // 渲染页码按钮
  const renderPageButtons = () => {
    const buttons = [];
    const SIBLING_COUNT = 1; // 当前页左右显示的页码数量
    
    // 确保最小有1页
    const validTotalPages = Math.max(1, totalPages);
    const validCurrentPage = Math.min(currentPage, validTotalPages);
    
    // 添加上一页按钮
    buttons.push(
      <li key="prev" className="inline-block m-0 text-gray-500">
        <button
          className="cursor-pointer px-3.5 flex items-center justify-center h-10 min-w-[2.5rem] m-1 overflow-visible border-2 border-zinc-200 border-solid rounded disabled:opacity-50"
          onClick={() => onPageChange(Math.max(validCurrentPage - 1, 1))}
          disabled={validCurrentPage === 1}
        >
          上一页
        </button>
      </li>
    );

    // 计算需要显示的页码范围
    let startPage = Math.max(1, validCurrentPage - SIBLING_COUNT);
    let endPage = Math.min(validTotalPages, validCurrentPage + SIBLING_COUNT);

    // 确保总是至少显示 1, 2, 3
    if (startPage <= 3) {
      endPage = Math.min(validTotalPages, Math.max(endPage, 3));
      startPage = 1;
    }

    // 确保总是显示最后3页
    if (endPage >= validTotalPages - 2) {
      startPage = Math.max(1, Math.min(startPage, validTotalPages - 2));
      endPage = validTotalPages;
    }

    // 始终显示第一页
    buttons.push(
      <li key={1} className="inline-block m-0 text-gray-500">
        <button
          className={`cursor-pointer flex items-center justify-center w-10 h-10 m-1 overflow-visible border-2 ${
            validCurrentPage === 1
              ? "bg-teal-500 text-white border-teal-500"
              : "border-zinc-200 text-gray-500"
          } border-solid rounded`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      </li>
    );

    // 如果起始页不是2，则显示省略号
    if (startPage > 2) {
      buttons.push(
        <li key="ellipsis1" className="inline-block m-0 text-gray-400">
          <span className="flex items-center justify-center h-10 px-2 m-1">...</span>
        </li>
      );
    }

    // 显示中间的页码
    for (let i = Math.max(2, startPage); i <= Math.min(endPage, validTotalPages - 1); i++) {
      buttons.push(
        <li key={i} className="inline-block m-0 text-gray-500">
          <button
            className={`cursor-pointer flex items-center justify-center w-10 h-10 m-1 overflow-visible border-2 ${
              validCurrentPage === i
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

    // 如果结束页不是倒数第二页，则显示省略号
    if (endPage < validTotalPages - 1) {
      buttons.push(
        <li key="ellipsis2" className="inline-block m-0 text-gray-400">
          <span className="flex items-center justify-center h-10 px-2 m-1">...</span>
        </li>
      );
    }

    // 如果总页数大于1，始终显示最后一页
    if (validTotalPages > 1) {
      buttons.push(
        <li key={validTotalPages} className="inline-block m-0 text-gray-500">
          <button
            className={`cursor-pointer flex items-center justify-center w-10 h-10 m-1 overflow-visible border-2 ${
              validCurrentPage === validTotalPages
                ? "bg-teal-500 text-white border-teal-500"
                : "border-zinc-200 text-gray-500"
            } border-solid rounded`}
            onClick={() => onPageChange(validTotalPages)}
          >
            {validTotalPages}
          </button>
        </li>
      );
    }

    // 添加下一页按钮
    buttons.push(
      <li key="next" className="inline-block m-0 text-gray-500">
        <button
          className="cursor-pointer px-3.5 flex items-center justify-center h-10 min-w-[2.5rem] m-1 overflow-visible border-2 border-zinc-200 border-solid rounded disabled:opacity-50"
          onClick={() => onPageChange(Math.min(validCurrentPage + 1, validTotalPages))}
          disabled={validCurrentPage === validTotalPages}
        >
          下一页
        </button>
      </li>
    );

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
        <div className="text-gray-400 float-right px-1 h-10 m-0 flex items-center">
          <div className="inline-block m-0">共 {totalPages} 页 ，</div>
          跳至
          <div className="relative inline-block">
            <input
              className={`cursor-text px-3 text-center inline-block w-12 h-6 mx-1 overflow-visible border-2 ${
                showJumpError ? "border-red-500" : "border-neutral-300"
              } border-solid rounded text-[#00A1D6] font-medium focus:outline-none focus:border-[#00A1D6]`}
              type="text"
              value={inputPage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder=""
              title="输入页码后按回车键跳转"
            />
            {showJumpSuccess && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#00A1D6] text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                跳转成功!
              </div>
            )}
            {showJumpError && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                {errorMessage}
              </div>
            )}
          </div>
          页
          <span className="ml-1 text-xs text-gray-400">(回车跳转)</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
