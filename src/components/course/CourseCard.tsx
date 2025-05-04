import React from "react";
import { Course } from "../../services/api";

interface CourseCardProps {
  course: Course;
  listView: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, listView }) => {
  // 将 HTML 字符串转换为纯文本（去除 <em> 标签）
  const cleanTitle = course.title.replace(/<[^>]*>/g, "");

  // 创建 HTML 标题内容（保留高亮标签）
  const createMarkup = () => {
    return { __html: course.title };
  };

  return (
    <div
      className={`${listView ? "flex gap-4" : "flex flex-col"} bg-white rounded-md shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md`}
    >
      <div
        className={`${listView ? "w-40 h-28" : "w-full h-40"} relative overflow-hidden`}
      >
        <img
          src={course.cover}
          alt={cleanTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1">
          {course.ep_count_show}
        </div>
      </div>

      <div className={`${listView ? "flex-1" : ""} p-3 flex flex-col`}>
        <h3
          className="text-sm font-medium text-neutral-800 line-clamp-2 mb-1"
          title={cleanTitle}
          dangerouslySetInnerHTML={createMarkup()}
        />
        <p
          className="text-xs text-neutral-500 line-clamp-2 mb-2"
          title={course.subtitle}
        >
          {course.subtitle}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-neutral-500">{course.up_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">
              {course.stat.view.toLocaleString()} 观看
            </span>
            <span className="text-xs text-teal-500 font-medium">
              {course.price_format} 元
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
