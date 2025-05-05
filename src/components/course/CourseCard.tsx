import React from "react";
import { Course } from "../../services/api";

interface CourseCardProps {
  course: Course;
  listView: boolean;
  searchWord?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, listView, searchWord }) => {
  // 将 HTML 字符串转换为纯文本（去除 <em> 标签）
  const cleanTitle = course.title.replace(/<[^>]*>/g, "");

  // 格式化观看次数为万为单位
  const formatViewCount = (count: number) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
  };

  // 判断标签类型
  const isProduction = course.show_tag === 1; // 出品
  const isExclusive = course.show_tag === 2; // 独家

  const handleClick = () => {
    if (course.link) {
      window.open(course.link, '_blank');
    }
  };

  return (
    <div
      className={`${listView ? "flex gap-4 w-full h-[116px]" : "flex flex-col w-[236px]"} bg-white overflow-hidden cursor-pointer`}
      onClick={handleClick}
    >
      <div
        className={`${listView ? "w-[206px] h-[116px]" : "w-[236px] h-[133px]"} relative overflow-hidden`}
      >
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
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1 flex justify-between">
          <span>{course.ep_count_show}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M844.8 977.066667H179.2C81.066667 977.066667 0 896 0 797.866667V226.133333C0 128 81.066667 46.933333 179.2 46.933333h665.6C942.933333 46.933333 1024 128 1024 226.133333v571.733334c0 98.133333-81.066667 179.2-179.2 179.2zM179.2 119.466667c-59.733333 0-106.666667 46.933333-106.666667 106.666666v571.733334c0 59.733333 46.933333 106.666667 106.666667 106.666666h665.6c59.733333 0 106.666667-46.933333 106.666667-106.666666V226.133333c0-59.733333-46.933333-106.666667-106.666667-106.666666H179.2z" fill="currentColor" />
              <path d="M695.466667 473.6l-264.533334-153.6c-25.6-12.8-59.733333 8.533333-59.733333 38.4v302.933333c0 34.133333 34.133333 55.466667 64 38.4l264.533333-153.6c25.6-12.8 25.6-55.466667-4.266666-72.533333z" fill="currentColor" />
            </svg>
            <span>{formatViewCount(course.stat.view)}</span>
          </div>
        </div>
      </div>

      <div className={`${listView ? "flex-1" : ""} p-3 flex flex-col`}>
        <h3
          className="text-sm font-medium text-neutral-800 line-clamp-1 mb-1 hover:text-bilibili"
          title={cleanTitle}
          dangerouslySetInnerHTML={{ __html: course.title.replace(/<em class="keyword">(.*?)<\/em>/g, '$1') }}
        />
        {/* 显示副标题 */}
        <p
          className="text-xs text-neutral-500 line-clamp-1 mb-2"
          title={course.subtitle}
        >
          {course.subtitle}
        </p>

        {/* 价格信息 - 在列表视图中提前显示 */}
        <div className={`${listView ? "mb-1" : "mt-auto"}`}>
          <div className="flex items-center gap-1">
            {course.coupon_price_format && course.coupon_price_format !== course.price_format ? (
              <>
                <span className="text-sm text-neutral-400 line-through">
                  {course.price_format}元
                </span>
                <span className="text-sm text-bilibili font-medium">
                  {course.coupon_price_format_show?.replace('券后 ', '')}
                </span>
              </>
            ) : (
              <span className="text-sm text-bilibili font-medium">
                {course.price_format}元
              </span>
            )}
          </div>
        </div>
        
        {/* 试看信息 - 只在列表视图中显示 */}
        {listView && course.first_ep_label && course.first_ep_title && (
          <div className="flex items-center gap-1 text-xs text-[#00A1D6] mt-1">
            <span className="border border-[#00A1D6] px-1 rounded text-[10px]">{course.first_ep_label}</span>
            <span className="truncate text-[10px]">{course.first_ep_title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
