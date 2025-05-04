import axios from "axios";
import {
  mockCategories,
  mockSortOptions,
  mockFilterOptions,
  mockServiceOptions,
  mockCourses,
} from "../data/mockData";

// API 基础配置
const API_BASE_URL = "https://api.bilibili.com";

// 使用开发环境变量控制是否使用模拟数据
const USE_MOCK_DATA = false;

// 分类数据接口
export interface Category {
  id: number;
  name: string;
  type: number;
  sub_list?: Category[];
  active?: boolean;
}

// 排序选项接口
export interface SortOption {
  id: number;
  resource_id: number;
  src_id: number;
  title: string;
  active?: boolean;
}

// 筛选条件接口
export interface FilterOption {
  id: number;
  resource_id: number;
  src_id: number;
  title: string;
  active?: boolean;
}

// 服务条件接口
export interface ServiceOption {
  id: number;
  resource_id: number;
  src_id: number;
  title: string;
  active?: boolean;
}

// 课程数据接口
export interface Course {
  seasonId: number;
  cover: string;
  title: string;
  subtitle: string;
  up_name: string;
  price_format: string;
  ep_count: number;
  ep_count_show: string;
  stat: {
    view: number;
    show_vt: boolean;
  };
  status_label: string;
  user_status: {
    payed: number;
  };
}

// 分页数据接口
export interface PageInfo {
  num: number;
  size: number;
  total: number;
  next: boolean;
}

// 分类数据响应接口
interface ClassificationsResponse {
  code: number;
  data: {
    classification_list: Category[];
    season_search_sort_type_list: SortOption[];
    season_search_filter_type_list: FilterOption[];
    season_search_cond_type_list: ServiceOption[];
  };
  message: string;
}

// 课程数据响应接口
interface CourseListResponse {
  code: number;
  data: {
    items: Course[];
    page: PageInfo;
    extra_data?: {
      divided: boolean;
      extra_items: Course[];
      query: string;
      search_ab: number;
      trackid: string;
    };
  };
  message: string;
}

// 查询参数接口
export interface QueryParams {
  classification_id?: number;
  sort_type?: number;
  page_size?: number;
  page?: number;
  word?: string;
}

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

  // 如果使用模拟数据，直接返回模拟数据
  if (USE_MOCK_DATA) {
    categoryCache = {
      categories: mockCategories,
      sortOptions: mockSortOptions,
      filterOptions: mockFilterOptions,
      serviceOptions: mockServiceOptions,
    };
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

    console.warn("获取分类数据失败，使用模拟数据");
    categoryCache = {
      categories: mockCategories,
      sortOptions: mockSortOptions,
      filterOptions: mockFilterOptions,
      serviceOptions: mockServiceOptions,
    };
    return categoryCache;
  } catch (error) {
    console.error("获取分类数据出错:", error);
    console.log("使用模拟数据");
    categoryCache = {
      categories: mockCategories,
      sortOptions: mockSortOptions,
      filterOptions: mockFilterOptions,
      serviceOptions: mockServiceOptions,
    };
    return categoryCache;
  }
};

/**
 * 获取课程列表
 */
export const getCourseList = async (params: QueryParams = {}) => {
  // 如果使用模拟数据，直接返回模拟数据
  if (USE_MOCK_DATA) {
    // 简单的搜索过滤逻辑
    let filteredCourses = mockCourses;
    if (params.word) {
      filteredCourses = mockCourses.filter((course) =>
        course.title.toLowerCase().includes(params.word?.toLowerCase() || "")
      );
    }

    const pageSize = params.page_size || 30;
    const page = params.page || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredCourses.length);
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    // 为测试目的，当主要数据不足时模拟一些额外推荐
    const extraRecommendations =
      paginatedCourses.length < 12
        ? mockCourses.slice(0, Math.min(6, mockCourses.length))
        : [];

    return {
      courses: paginatedCourses,
      extraCourses: extraRecommendations,
      pageInfo: {
        num: page,
        size: pageSize,
        total: filteredCourses.length,
        next: endIndex < filteredCourses.length,
      },
    };
  }

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

    // 调试输出，查看返回数据结构
    console.log("API Response:", response);

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

      console.log(
        `获取到 ${items.length} 条主要数据，${extraItems.length} 条额外推荐`
      );

      return {
        courses: items,
        extraCourses: extraItems,
        pageInfo: page,
      };
    }

    // 如果请求成功但没有获取到有效数据，使用模拟数据
    console.warn("获取课程列表失败，使用模拟数据");
    // 简单的搜索过滤逻辑
    let filteredCourses = mockCourses;
    if (params.word) {
      filteredCourses = mockCourses.filter((course) =>
        course.title.toLowerCase().includes(params.word?.toLowerCase() || "")
      );
    }

    const pageSize = params.page_size || 30;
    const page = params.page || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredCourses.length);
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return {
      courses: paginatedCourses,
      extraCourses: paginatedCourses.length < 12 ? mockCourses.slice(0, 6) : [],
      pageInfo: {
        num: page,
        size: pageSize,
        total: filteredCourses.length,
        next: endIndex < filteredCourses.length,
      },
    };
  } catch (error) {
    console.error("获取课程列表出错:", error);
    console.log("使用模拟数据");

    // 简单的搜索过滤逻辑
    let filteredCourses = mockCourses;
    if (params.word) {
      filteredCourses = mockCourses.filter((course) =>
        course.title.toLowerCase().includes(params.word?.toLowerCase() || "")
      );
    }

    const pageSize = params.page_size || 30;
    const page = params.page || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredCourses.length);
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return {
      courses: paginatedCourses,
      extraCourses: paginatedCourses.length < 12 ? mockCourses.slice(0, 6) : [],
      pageInfo: {
        num: page,
        size: pageSize,
        total: filteredCourses.length,
        next: endIndex < filteredCourses.length,
      },
    };
  }
};
