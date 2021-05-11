export type CassWidgetVo = {
  create_user_id?: string;
  created_at?: number;
  description?: string;
  icon_url?: string;
  id?: number;
  settings?: string;
  update_user_id?: string;
  updated_at?: number;
  widget_name?: string;
  testObj?: {
    create_user_id?: string;
    // 是否强制更新 0：否、1：是
    force_flag?: number;
    id?: number;
    // 发布状态，1：已发布，0：未发布， 安卓6家应用市场，需转成二进制判断每一位，顺序：应用宝、华为、小米、魅族、OPPO、VIVO
    issue_status?: string;
    widget_type?: 'H5' | 'MINI_APP';
  };
  widget_type?: 'H5' | 'MINI_APP';
};
