import { CassWidgetVo } from './CassWidgetVo';
import { CassAppVo } from './CassAppVo';

export type IPagedCassWidgetVo = {
  extra?: string;
  extra_num?: number;
  has_next_page?: boolean;
  has_prev_page?: boolean;
  test1?: CassWidgetVo;
  test2?: CassAppVo;
  list?: CassWidgetVo[];
  navigate_page_nums?: number[];
  page_num?: number;
  page_size?: number;
  pages?: number;
  size?: number;
  total?: number;
};
