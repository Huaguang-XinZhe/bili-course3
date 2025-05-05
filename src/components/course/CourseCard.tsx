import React from "react";
import { Course } from "../../type";

interface CourseCardProps {
  course: Course;
  listView: boolean;
  searchWord?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  listView,
  searchWord,
}) => {
  // 将 HTML 字符串转换为纯文本（去除 <em> 标签）
  const cleanTitle = course.title.replace(/<[^>]*>/g, "");

  // 格式化观看次数为万为单位
  const formatViewCount = (count: number) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + "万";
    }
    return count.toString();
  };

  // 处理价格显示，移除B币文本
  const formatPriceShow = (priceText: string) => {
    return priceText.replace("B币", "元").replace("券后 ", "");
  };

  // 处理标题高亮显示
  const formatTitle = () => {
    // 如果有搜索关键词，将其转换为主题色
    if (searchWord && searchWord.trim() !== "") {
      // 先移除原有的 em 标签
      const cleanedTitle = course.title.replace(
        /<em class="keyword">(.*?)<\/em>/g,
        "$1"
      );
      // 创建正则表达式，不区分大小写
      const regex = new RegExp(`(${searchWord})`, "gi");
      // 替换为主题色的 span
      return cleanedTitle.replace(
        regex,
        '<span class="text-[#00A1D6]">$1</span>'
      );
    }
    // 如果有带 em 标签的内容，将其转换为主题色
    else if (course.title.includes('<em class="keyword">')) {
      return course.title.replace(
        /<em class="keyword">(.*?)<\/em>/g,
        '<span class="text-[#00A1D6]">$1</span>'
      );
    }
    return course.title;
  };

  // 判断标签类型
  const isProduction = course.show_tag === 1; // 出品
  const isExclusive = course.show_tag === 2; // 独家

  const handleClick = () => {
    if (course.link) {
      window.open(course.link, "_blank");
    }
  };

  // 列表视图
  if (listView) {
    return (
      <div
        className="flex gap-4 w-full h-[116px] bg-white overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-[206px] h-[116px] relative overflow-hidden">
          <img
            src={course.cover}
            alt={cleanTitle}
            className="w-full h-full object-cover"
          />
          {/* 出品标志 */}
          {isProduction && (
            <div className="absolute top-0 right-0">
              <div className="bg-[#FB7299] text-white text-xs px-1.5 py-0.5 rounded-bl-md font-medium">
                出品
              </div>
            </div>
          )}
          {/* 独家标志 */}
          {isExclusive && (
            <div className="absolute top-0 right-0">
              <div className="bg-[#00A1D6] text-white text-xs px-1.5 py-0.5 rounded-bl-md font-medium">
                独家
              </div>
            </div>
          )}
          <div className="bg-gradient-to-t from-black/60 to-transparent rounded-b-[2px] absolute bottom-0 left-0 w-full h-[58px]"></div>
          <div className="absolute bottom-0 left-0 right-0 text-white text-xs px-2 py-1 flex justify-between">
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M844.8 977.066667H179.2C81.066667 977.066667 0 896 0 797.866667V226.133333C0 128 81.066667 46.933333 179.2 46.933333h665.6C942.933333 46.933333 1024 128 1024 226.133333v571.733334c0 98.133333-81.066667 179.2-179.2 179.2zM179.2 119.466667c-59.733333 0-106.666667 46.933333-106.666667 106.666666v571.733334c0 59.733333 46.933333 106.666667 106.666667 106.666666h665.6c59.733333 0 106.666667-46.933333 106.666667-106.666666V226.133333c0-59.733333-46.933333-106.666667-106.666667-106.666666H179.2z"
                  fill="currentColor"
                />
                <path
                  d="M695.466667 473.6l-264.533334-153.6c-25.6-12.8-59.733333 8.533333-59.733333 38.4v302.933333c0 34.133333 34.133333 55.466667 64 38.4l264.533333-153.6c25.6-12.8 25.6-55.466667-4.266666-72.533333z"
                  fill="currentColor"
                />
              </svg>
              <span>{formatViewCount(course.stat.view)}</span>
            </div>
            <span>{course.ep_count_show}</span>
          </div>
        </div>

        <div className="flex-1 py-2 px-3 flex flex-col justify-between h-full">
          {/* 第一行：标题 */}
          <h3
            className="text-sm font-medium text-neutral-800 line-clamp-1 hover:text-bilibili"
            title={cleanTitle}
            dangerouslySetInnerHTML={{
              __html: formatTitle(),
            }}
          />

          {/* 第二行：副标题 */}
          <p
            className="text-xs text-neutral-500 line-clamp-1 mt-1"
            title={course.subtitle}
          >
            {course.subtitle}
          </p>

          {/* 第三行：价格信息 */}
          <div className="mt-1">
            <div className="flex items-center gap-1.5">
              {course.coupon_price_format &&
              course.coupon_price_format !== course.price_format ? (
                <>
                  <span className="text-sm text-neutral-400 line-through">
                    {course.price_format}元
                  </span>
                  <span className="text-sm text-bilibili font-medium">
                    {formatPriceShow(course.coupon_price_format_show || "")}
                  </span>
                </>
              ) : (
                <span className="text-sm text-bilibili font-medium">
                  {course.price_format}元
                </span>
              )}
            </div>
          </div>

          {/* 第四行：试看信息 */}
          {course.first_ep_title && (
            <div className="flex items-center gap-1.5 text-xs bg-neutral-100 rounded-sm p-1 mt-1">
              <svg
                className="w-3 h-3 text-[#00A1D6] flex-shrink-0"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M695.466667 473.6l-264.533334-153.6c-25.6-12.8-59.733333 8.533333-59.733333 38.4v302.933333c0 34.133333 34.133333 55.466667 64 38.4l264.533333-153.6c25.6-12.8 25.6-55.466667-4.266666-72.533333z"
                  fill="currentColor"
                />
                <path
                  d="M844.8 977.066667H179.2C81.066667 977.066667 0 896 0 797.866667V226.133333C0 128 81.066667 46.933333 179.2 46.933333h665.6C942.933333 46.933333 1024 128 1024 226.133333v571.733334c0 98.133333-81.066667 179.2-179.2 179.2zM179.2 119.466667c-59.733333 0-106.666667 46.933333-106.666667 106.666666v571.733334c0 59.733333 46.933333 106.666667 106.666667 106.666666h665.6c59.733333 0 106.666667-46.933333 106.666667-106.666666V226.133333c0-59.733333-46.933333-106.666667-106.666667-106.666666H179.2z"
                  fill="currentColor"
                />
              </svg>
              {course.first_ep_label ? (
                <>
                  <span className="border border-[#00A1D6] px-1 py-0.5 rounded text-[10px] text-[#00A1D6] flex-shrink-0 whitespace-nowrap">
                    {course.first_ep_label}
                  </span>
                  <span className="truncate text-[10px] text-[#00A1D6] max-w-[140px]">
                    {course.first_ep_title}
                  </span>
                </>
              ) : (
                <span className="truncate text-[10px] max-w-[180px]">
                  {course.first_ep_title}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 网格视图 - 完全重构
  return (
    <div
      className="flex flex-col w-[236px] bg-white overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full h-[133px] relative overflow-hidden">
        <img
          src={course.cover}
          alt={cleanTitle}
          className="w-full h-full object-cover"
        />
        {/* 出品标志 */}
        {isProduction && (
          <div className="absolute top-0 right-0">
            <div className="bg-[#FB7299] text-white text-xs px-1.5 py-0.5 rounded-bl-md font-medium">
              出品
            </div>
          </div>
        )}
        {/* 独家标志 */}
        {isExclusive && (
          <div className="absolute top-0 right-0">
            <div className="bg-[#00A1D6] text-white text-xs px-1.5 py-0.5 rounded-bl-md font-medium">
              独家
            </div>
          </div>
        )}
        <div className="bg-gradient-to-t from-black/60 to-transparent rounded-b-[2px] absolute bottom-0 left-0 w-full h-[58px]"></div>
        <div className="absolute bottom-0 left-0 right-0 text-white text-xs px-2 py-1 flex justify-between">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M844.8 977.066667H179.2C81.066667 977.066667 0 896 0 797.866667V226.133333C0 128 81.066667 46.933333 179.2 46.933333h665.6C942.933333 46.933333 1024 128 1024 226.133333v571.733334c0 98.133333-81.066667 179.2-179.2 179.2zM179.2 119.466667c-59.733333 0-106.666667 46.933333-106.666667 106.666666v571.733334c0 59.733333 46.933333 106.666667 106.666667 106.666666h665.6c59.733333 0 106.666667-46.933333 106.666667-106.666666V226.133333c0-59.733333-46.933333-106.666667-106.666667-106.666666H179.2z"
                fill="currentColor"
              />
              <path
                d="M695.466667 473.6l-264.533334-153.6c-25.6-12.8-59.733333 8.533333-59.733333 38.4v302.933333c0 34.133333 34.133333 55.466667 64 38.4l264.533333-153.6c25.6-12.8 25.6-55.466667-4.266666-72.533333z"
                fill="currentColor"
              />
            </svg>
            <span>{formatViewCount(course.stat.view)}</span>
          </div>
          <span>{course.ep_count_show}</span>
        </div>
      </div>

      {/* 内容容器 - 改为左对齐 */}
      <div className="w-full flex flex-col mt-3">
        {/* 标题 - 移除水平内边距 */}
        <div className="w-full">
          <h3
            className="text-sm font-medium text-neutral-800 line-clamp-1 mb-1 hover:text-bilibili"
            title={cleanTitle}
            dangerouslySetInnerHTML={{
              __html: formatTitle(),
            }}
          />
        </div>

        {/* 副标题 - 移除水平内边距 */}
        <div className="w-full">
          <p
            className="text-xs text-neutral-500 line-clamp-1 mb-2"
            title={course.subtitle}
          >
            {course.subtitle}
          </p>
        </div>

        {/* 价格信息 - 移除水平内边距 */}
        <div className="w-full mt-auto">
          <div className="flex items-center gap-1.5">
            {course.coupon_price_format &&
            course.coupon_price_format !== course.price_format ? (
              <>
                <span className="text-sm text-neutral-400 line-through">
                  {course.price_format}元
                </span>
                <span className="text-sm text-bilibili font-medium">
                  {formatPriceShow(course.coupon_price_format_show || "")}
                </span>
              </>
            ) : (
              <span className="text-sm text-bilibili font-medium">
                {course.price_format}元
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
