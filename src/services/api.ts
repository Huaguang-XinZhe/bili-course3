import axios from "axios";
import {
  Category,
  SortOption,
  FilterOption,
  ServiceOption,
  QueryParams,
  ClassificationsResponse,
  CourseListResponse,
  PageInfo,
} from "../type";

// API 基础配置
const API_BASE_URL = "https://api.bilibili.com";

// 分类数据缓存
let categoryCache: {
  categories: Category[];
  sortOptions: SortOption[];
  filterOptions: FilterOption[];
  serviceOptions: ServiceOption[];
} | null = null;

/**
 * 获取分类、排序等数据
 */
export const getClassifications = async () => {
  // 如果已有缓存数据，直接返回
  if (categoryCache) {
    return categoryCache;
  }

  try {
    const response = await axios.get<ClassificationsResponse>(
      `${API_BASE_URL}/pugv/app/web/classifications/new`
    );

    if (response.data.code === 0) {
      // 转换分类数据，添加 active 属性
      const categories = response.data.data.classification_list.map(
        (category: Category, index: number) => ({
          ...category,
          active: index === 0, // 默认第一个分类被选中
        })
      );

      // 转换排序选项数据，添加 active 属性
      const sortOptions = response.data.data.season_search_sort_type_list.map(
        (option: SortOption, index: number) => ({
          ...option,
          active: index === 0, // 默认第一个排序选项被选中
        })
      );

      // 转换筛选条件数据，添加 active 属性
      const filterOptions =
        response.data.data.season_search_filter_type_list.map(
          (option: FilterOption, index: number) => ({
            ...option,
            active: index === 0, // 默认第一个筛选条件被选中
          })
        );

      // 转换服务条件数据，添加 active 属性
      const serviceOptions =
        response.data.data.season_search_cond_type_list.map(
          (option: ServiceOption, index: number) => ({
            ...option,
            active: index === 0, // 默认第一个服务条件被选中
          })
        );

      // 缓存数据
      categoryCache = {
        categories,
        sortOptions,
        filterOptions,
        serviceOptions,
      };

      return categoryCache;
    }

    throw new Error("获取分类数据失败");
  } catch (error) {
    console.error("获取分类数据出错:", error);
    throw error;
  }
};

/**
 * 获取课程列表
 */
export const getCourseList = async (params: QueryParams = {}) => {
  try {
    // 默认参数
    const defaultParams: Required<QueryParams> = {
      classification_id: -1,
      sort_type: -1,
      page_size: 30,
      page: 1,
      word: "",
      ...params,
    };

    const response = await axios.get<CourseListResponse>(
      `${API_BASE_URL}/pugv/app/web/seasonSeek`,
      { params: defaultParams }
    );

    if (response.data.code === 0 && response.data.data) {
      // 获取主要课程列表
      const items = response.data.data.items || [];

      // 获取额外推荐的课程列表
      const extraItems = response.data.data.extra_data?.extra_items || [];

      // 安全地获取分页信息
      const pageData = response.data.data.page;
      const page: PageInfo = {
        num: pageData?.num || defaultParams.page,
        size: pageData?.size || defaultParams.page_size,
        total: pageData?.total || items.length,
        next: pageData?.next || false,
      };

      return {
        courses: items,
        extraCourses: extraItems,
        pageInfo: page,
      };
    }

    throw new Error("获取课程列表失败");
  } catch (error) {
    console.error("获取课程列表出错:", error);
    throw error;
  }
};
