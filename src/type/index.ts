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
  price_format_show: string;
  coupon_price_format?: string;
  coupon_price_format_show?: string;
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
  link?: string; // 课程链接
  season_tag?: number; // 季度标签
  show_tag?: number; // 显示标签，用于判断是否为独家
  first_ep_label?: string;
  first_ep_title?: string;
  season_selected_rank?: {
    badge_type: number;
    season_id: number;
    show_season_selected_mark_url: string;
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
export interface ClassificationsResponse {
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
export interface CourseListResponse {
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
