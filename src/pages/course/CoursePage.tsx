import React, { useEffect, useState } from "react";
import SearchBar from "../../components/course/SearchBar";
import CategoryNav from "../../components/course/CategoryNav";
import SortOptions from "../../components/course/SortOptions";
import CourseList from "../../components/course/CourseList";
import Pagination from "../../components/course/Pagination";
import {
  getClassifications,
  getCourseList,
  Category,
  SortOption,
  Course,
  PageInfo,
  QueryParams,
} from "../../services/api";

const CoursePage: React.FC = () => {
  // 状态管理
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [extraCourses, setExtraCourses] = useState<Course[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    num: 1,
    size: 30,
    total: 0,
    next: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 查询参数
  const [queryParams, setQueryParams] = useState<QueryParams>({
    classification_id: -1,
    sort_type: -1,
    page_size: 30,
    page: 1,
  });

  // 获取分类和排序数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getClassifications();
        setCategories(data.categories);
        setSortOptions(data.sortOptions);
      } catch (err) {
        setError("获取分类数据失败");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // 获取课程数据
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCourseList({
          ...queryParams,
          word: searchKeyword || undefined,
        });

        // 设置主要课程列表
        setCourses(data.courses);
        // 设置额外推荐的课程
        setExtraCourses(data.extraCourses || []);
        setPageInfo(data.pageInfo);
      } catch (err) {
        setError("获取课程数据失败");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchCourses();
    }
  }, [queryParams, searchKeyword, categories.length]);

  // 分类选择处理
  const handleCategorySelect = (id: number) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      active: category.id === id,
    }));
    setCategories(updatedCategories);

    // 更新查询参数
    setQueryParams({
      ...queryParams,
      classification_id: id,
      page: 1, // 切换分类时重置页码
    });
  };

  // 排序选择处理
  const handleSortSelect = (id: number) => {
    const updatedSortOptions = sortOptions.map((option) => ({
      ...option,
      active: option.id === id,
    }));
    setSortOptions(updatedSortOptions);

    // 更新查询参数
    setQueryParams({
      ...queryParams,
      sort_type: id,
      page: 1, // 切换排序时重置页码
    });
  };

  // 页码变化处理
  const handlePageChange = (page: number) => {
    setQueryParams({
      ...queryParams,
      page,
    });

    // 滚动到页面顶部
    window.scrollTo(0, 0);
  };

  // 搜索处理
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setQueryParams({
      ...queryParams,
      page: 1, // 搜索时重置页码
    });
  };

  // 判断主要课程是否数量不足
  const shouldShowExtraCourses = courses.length < 12 && extraCourses.length > 0;

  return (
    <div className="text-neutral-800 text-xs py-8 px-28 min-h-[43.75rem] w-[66.88rem] min-[1400px]:w-[77.06rem]">
      <div className="w-96 mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <div>
          {categories.length > 0 && (
            <CategoryNav
              categories={categories}
              onSelect={handleCategorySelect}
            />
          )}
          {sortOptions.length > 0 && (
            <SortOptions options={sortOptions} onSelect={handleSortSelect} />
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">加载中...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <>
          <CourseList courses={courses} />

          {/* 显示额外推荐的课程（当主要课程数量不足时） */}
          {shouldShowExtraCourses && (
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4 text-neutral-800 border-l-4 border-teal-500 pl-2">
                更多推荐
              </h2>
              <CourseList courses={extraCourses} />
            </div>
          )}

          <Pagination
            totalPages={Math.ceil(pageInfo.total / pageInfo.size)}
            currentPage={pageInfo.num}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        </>
      )}
    </div>
  );
};

export default CoursePage;
