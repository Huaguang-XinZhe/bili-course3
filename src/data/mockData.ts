import {
  Category,
  Course,
  SortOption,
  FilterOption,
  ServiceOption,
} from "../type";

// 模拟分类数据
export const mockCategories: Category[] = [
  { id: -1, name: "全部分类", type: 0, active: true },
  { id: 95, name: "通识科普", type: 1 },
  { id: 94, name: "兴趣生活", type: 1 },
  { id: 93, name: "语言学习", type: 1 },
  { id: 88, name: "考研", type: 1 },
  { id: 87, name: "考试·考证", type: 1 },
  { id: 164, name: "影视·创作", type: 1 },
  { id: 89, name: "IT互联网", type: 1 },
  { id: 92, name: "职业职场", type: 1 },
  { id: 181, name: "个人成长", type: 1 },
];

// 模拟排序选项
export const mockSortOptions: SortOption[] = [
  { id: -1, resource_id: 0, src_id: 0, title: "综合排序", active: true },
  { id: 1, resource_id: 0, src_id: 0, title: "销量最高" },
  { id: 2, resource_id: 0, src_id: 0, title: "最新上架" },
  { id: 3, resource_id: 0, src_id: 0, title: "售价最低" },
];

// 模拟筛选条件
export const mockFilterOptions: FilterOption[] = [
  { id: -1, resource_id: 0, src_id: 0, title: "课程类型", active: true },
  { id: 1, resource_id: 0, src_id: 0, title: "课堂臻选" },
  { id: 2, resource_id: 0, src_id: 0, title: "B站独家" },
];

// 模拟服务条件
export const mockServiceOptions: ServiceOption[] = [
  { id: -1, resource_id: 0, src_id: 0, title: "全部服务", active: true },
  { id: 1, resource_id: 0, src_id: 0, title: "含直播课" },
  { id: 2, resource_id: 0, src_id: 0, title: "含课程群" },
  { id: 3, resource_id: 0, src_id: 0, title: "已完结" },
];

// 模拟课程数据
export const mockCourses: Course[] = [
  {
    seasonId: 1047,
    cover:
      "https://archive.biliimg.com/bfs/archive/fdfac91108fdb643b52e3288037c0b27db3c3c6c.jpg",
    title: "React18 从入门到实战（答疑+全套资料）",
    subtitle: "系统学习 React ，掌握大厂必备技能",
    up_name: "慕课网官方账号",
    price_format: "299",
    price_format_show: "299元",
    ep_count: 95,
    ep_count_show: "共95课时",
    stat: {
      view: 169864,
      show_vt: false,
    },
    status_label: "已完结",
    user_status: {
      payed: 0,
    },
  },
  {
    seasonId: 25016,
    cover:
      "https://archive.biliimg.com/bfs/archive/b68177e238dd422f5fe9f7cfc88673699eef314a.jpg",
    title: "2025徐老师React18&19课程含项目实战",
    subtitle: "课程为2024徐老师本人最新录制，从基础理论到项目实战全覆盖",
    up_name: "前端徐老师",
    price_format: "358",
    price_format_show: "358元",
    ep_count: 144,
    ep_count_show: "共144课时",
    stat: {
      view: 41567,
      show_vt: false,
    },
    status_label: "已完结",
    user_status: {
      payed: 0,
    },
  },
  {
    seasonId: 11302,
    cover:
      "https://archive.biliimg.com/bfs/archive/5bad1c0e440cffcd3a78c82294941b649a8ed520.jpg",
    title: "React 完全指南 2024",
    subtitle: "让你拥有完全胜任 React 前端开发工作的技能",
    up_name: "峰华前端工程师",
    price_format: "98",
    price_format_show: "98元",
    ep_count: 196,
    ep_count_show: "共196课时",
    stat: {
      view: 74152,
      show_vt: false,
    },
    status_label: "已完结",
    user_status: {
      payed: 0,
    },
  },
  {
    seasonId: 7221,
    cover:
      "https://archive.biliimg.com/bfs/archive/b8a3169e47fdfc68ef50af1a9ab9355badabae92.jpg",
    title: "React面试宝典",
    subtitle: "为React开发者量身打造的面试指南~",
    up_name: "bubucuo",
    price_format: "179",
    price_format_show: "179元",
    ep_count: 48,
    ep_count_show: "共48课时",
    stat: {
      view: 12861,
      show_vt: false,
    },
    status_label: "已完结",
    user_status: {
      payed: 0,
    },
  },
  {
    seasonId: 14505,
    cover:
      "https://archive.biliimg.com/bfs/archive/8cf68f3d7f3ca71e6c0bea2d2d7a0de6e2b92091.jpg",
    title: "代码片段软件开发！react、electron",
    subtitle: "使用 react、electron、ts 开发的桌面软件",
    up_name: "后盾人-前端后端编程",
    price_format: "126",
    price_format_show: "126元",
    ep_count: 185,
    ep_count_show: "共185课时",
    stat: {
      view: 15693,
      show_vt: false,
    },
    status_label: "已完结",
    user_status: {
      payed: 0,
    },
  },
  {
    seasonId: 61474,
    cover:
      "https://archive.biliimg.com/bfs/archive/b0ec0a95e243f6e798a1c65d2e110ae182afa820.jpg",
    title: "React项目实战",
    subtitle: "React项目实战",
    up_name: "zhang手摸手带你学前端",
    price_format: "39.99",
    price_format_show: "39.99元",
    ep_count: 20,
    ep_count_show: "共20课时",
    stat: {
      view: 2211,
      show_vt: false,
    },
    status_label: "已完结",
    user_status: {
      payed: 0,
    },
  },
];
