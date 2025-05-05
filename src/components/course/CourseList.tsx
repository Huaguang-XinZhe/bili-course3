import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../services/api";
import ViewToggle from "./ViewToggle";

interface CourseListProps {
  courses: Course[];
  extraCourses?: Course[];
  searchWord?: string;
  listView?: boolean;
  showViewToggle?: boolean;
  onToggleView?: () => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  extraCourses,
  searchWord,
  listView = false,
  showViewToggle = true,
  onToggleView,
}) => {
  return (
    <div>
      <div className="flex justify-end items-center my-4">
        {showViewToggle && onToggleView && (
          <ViewToggle listView={listView} onToggle={onToggleView} />
        )}
      </div>

      <div
        className={`${
          listView ? "grid grid-cols-2 gap-4" : "grid grid-cols-5 gap-4"
        }`}
      >
        {courses.map((course) => (
          <CourseCard
            key={course.seasonId}
            course={course}
            listView={listView}
            searchWord={searchWord}
          />
        ))}
      </div>

      {extraCourses && extraCourses.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">更多推荐</h3>
          <div
            className={`${
              listView ? "grid grid-cols-2 gap-4" : "grid grid-cols-5 gap-4"
            }`}
          >
            {extraCourses.map((course) => (
              <CourseCard
                key={course.seasonId}
                course={course}
                listView={listView}
                searchWord={searchWord}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
