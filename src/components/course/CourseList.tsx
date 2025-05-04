import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../services/api";
import ViewToggle from "./ViewToggle";

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const [listView, setListView] = React.useState(false);

  const toggleView = () => {
    setListView(!listView);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <div className="text-neutral-400">共 {courses.length} 个课程</div>
        <ViewToggle listView={listView} onToggle={toggleView} />
      </div>

      <div
        className={`grid ${listView ? "grid-cols-1 gap-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}`}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.seasonId}
              course={course}
              listView={listView}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-neutral-400">
            暂无课程数据
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
