import React, { useEffect, useState } from "react";
import SearchBar from "../../components/course/SearchBar";
import CategoryNav from "../../components/course/CategoryNav";
import SortOptions from "../../components/course/SortOptions";
import CourseList from "../../components/course/CourseList";
import Pagination from "../../components/course/Pagination";
import ViewToggle from "../../components/course/ViewToggle";
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
  const [listView, setListView] = useState<boolean>(false);

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

        // 不再自动回退到上一页，让界面显示"无数据"提示比突然跳转更好
        // 通过API响应示例我们看到，即使没有主要内容，API也会返回推荐内容
        
        // 设置主要课程列表
        setCourses(data.courses);
        // 设置额外推荐的课程
        setExtraCourses(data.extraCourses || []);
        
        // 直接使用API返回的分页信息
        setPageInfo(data.pageInfo);
        
      } catch (err) {
        setError("获取课程数据失败");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // 只有当有搜索关键词时才加载课程
    if (searchKeyword) {
      fetchCourses();
    } else {
      setCourses([]);
      setExtraCourses([]);
      setIsLoading(false);
    }
  }, [queryParams, searchKeyword, categories.length]);

  // 分类选择处理
  const handleCategorySelect = (id: number) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      active: category.id === id,
    }));
    setCategories(updatedCategories);

    // 更新查询参数并立即加载数据
    setQueryParams({
      ...queryParams,
      classification_id: id,
      page: 1,
    });
  };

  // 排序选择处理
  const handleSortSelect = (id: number) => {
    const updatedSortOptions = sortOptions.map((option) => ({
      ...option,
      active: option.id === id,
    }));
    setSortOptions(updatedSortOptions);

    // 更新查询参数并立即加载数据
    setQueryParams({
      ...queryParams,
      sort_type: id,
      page: 1,
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

  // 切换视图布局
  const toggleView = () => {
    setListView(!listView);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="text-neutral-800 text-xs py-8 px-8 min-h-[43.75rem] w-[1400px]">
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div>
          {categories.length > 0 && (
            <CategoryNav
              categories={categories}
              onSelect={handleCategorySelect}
            />
          )}
          <div className="flex justify-between items-center mb-4">
            {sortOptions.length > 0 && (
              <SortOptions options={sortOptions} onSelect={handleSortSelect} />
            )}
            <ViewToggle listView={listView} onToggle={toggleView} />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">加载中...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <>
            {courses.length > 0 ? (
              <CourseList 
                courses={courses} 
                listView={listView}
                onToggleView={undefined}
                showViewToggle={false}
                searchWord={searchKeyword}
              />
            ) : searchKeyword ? (
              <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                <div className="text-lg mb-2">没有找到与"{searchKeyword}"相关的课程</div>
                <div className="text-sm">您可以尝试其他关键词，或查看以下推荐内容</div>
              </div>
            ) : null}

            {/* 显示额外推荐的课程 - 修改逻辑，当主内容为空但有推荐时总是显示 */}
            {extraCourses.length > 0 && (
              <div className={`${courses.length > 0 ? 'mt-8' : 'mt-4'}`}>
                <h2 className="text-lg font-medium mb-4 text-neutral-800 border-l-4 border-teal-500 pl-2">
                  {courses.length === 0 ? "推荐课程" : "更多推荐"}
                </h2>
                <CourseList 
                  courses={extraCourses} 
                  listView={listView}
                  showViewToggle={false}
                  onToggleView={undefined}
                  searchWord={searchKeyword}
                />
              </div>
            )}

            {/* 当主内容和推荐内容都为空时显示"无内容"提示 */}
            {courses.length === 0 && extraCourses.length === 0 && searchKeyword && (
              <div className="text-center py-20 text-gray-500">
                <div className="text-xl mb-3">暂无内容</div>
                <div className="text-sm">您可以尝试其他关键词或分类</div>
              </div>
            )}

            {/* 只有当有数据并且总数大于页面大小时才显示分页 */}
            {pageInfo.total > 0 && (
              <Pagination
                totalPages={Math.max(1, Math.ceil(pageInfo.total / pageInfo.size))}
                currentPage={pageInfo.num}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
