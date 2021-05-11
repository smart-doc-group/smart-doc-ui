export type CassAppVersionVo = {
  // 应用ID
  app_id?: number;
  // 状态，0：新建，1：已上线，2：已下线
  app_status?: number;
  // 苹果应用商店ID
  app_store_id?: string;
  // 应用类型
  app_type?: 'ios' | 'android' | 'wxma';
  // APP构建版本号
  build_version?: number;
  // 描述
  description?: string;
  // 下载地址
  download_url?: string;
  // 增量更新MD5签名
  ext_update_md5?: string;
  // 增量更新下载地址
  ext_update_url?: string;
  // 是否强制更新 0：否、1：是
  force_flag?: number;
  id?: number;
  // 发布状态，1：已发布，0：未发布， 安卓6家应用市场，需转成二进制判断每一位，顺序：应用宝、华为、小米、魅族、OPPO、VIVO
  issue_status?: string;
  // 全量更新包MD5签名
  md5?: string;
  // 升级提醒描述
  remind?: string;
  // APP版本号
  version?: string;
};
