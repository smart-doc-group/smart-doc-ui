import axios from 'axios';

const res1 = {
  swagger: '2.0',
  info: {
    description: 'Api Documentation',
    version: '1.0',
    title: 'Api Documentation',
    termsOfService: 'urn:tos',
    contact: {},
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0',
    },
  },
  host: '10.118.72.81:22768',
  basePath: '/',
  tags: [
    { name: 'widget-controller', description: 'Widget Controller' },
    { name: '应用版本', description: 'App Version Controller' },
    { name: '应用管理', description: 'App Controller' },
    { name: '错误编码', description: 'Error Code Service' },
  ],
  paths: {
    '/saas-api/app/app/': {
      post: {
        tags: ['应用管理'],
        summary: '添加应用',
        operationId: 'addUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'cassAppVo',
            description: 'cassAppVo',
            required: true,
            schema: {
              originalRef: 'CassAppVo',
              $ref: '#/definitions/CassAppVo',
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: { type: 'integer', format: 'int64' },
          },
          201: { description: 'Created' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/saas-api/app/app/disable/{id}': {
      delete: {
        tags: ['应用管理'],
        summary: '禁用应用',
        operationId: 'disableUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: { description: 'OK' },
          204: { description: 'No Content' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
        },
        deprecated: false,
      },
    },
    '/saas-api/app/app/enable/{id}': {
      post: {
        tags: ['应用管理'],
        summary: '启用应用',
        operationId: 'enableUsingPOST',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: { description: 'OK' },
          201: { description: 'Created' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/saas-api/app/app/{id}': {
      get: {
        tags: ['应用管理'],
        summary: '获取应用',
        operationId: 'getUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              originalRef: 'CassAppVo',
              $ref: '#/definitions/CassAppVo',
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
      put: {
        tags: ['应用管理'],
        summary: '修改应用',
        operationId: 'updateUsingPUT',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'cassAppVo',
            description: 'cassAppVo',
            required: true,
            schema: {
              originalRef: 'CassAppVo',
              $ref: '#/definitions/CassAppVo',
            },
          },
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: { description: 'OK' },
          201: { description: 'Created' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
      delete: {
        tags: ['应用管理'],
        summary: '删除应用',
        operationId: 'delUsingDELETE',
        produces: ['*/*'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: { description: 'OK' },
          204: { description: 'No Content' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
        },
        deprecated: false,
      },
    },
    '/saas-api/app/version/add': {
      post: {
        tags: ['应用版本'],
        summary: '添加应用版本',
        operationId: 'addUsingPOST_1',
        consumes: ['application/json'],
        produces: ['*/*'],
        parameters: [
          {
            in: 'body',
            name: 'cassAppVersionVo',
            description: 'cassAppVersionVo',
            required: true,
            schema: {
              originalRef: 'CassAppVersionVo',
              $ref: '#/definitions/CassAppVersionVo',
            },
          },
        ],
        responses: {
          200: { description: 'OK' },
          201: { description: 'Created' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/saas-api/app/version/new-version': {
      get: {
        tags: ['应用版本'],
        summary: '获取最新版本',
        operationId: 'getNewVersionUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'app_id',
            in: 'query',
            description: 'app_id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'app_type',
            in: 'query',
            description: 'app_type',
            required: true,
            type: 'string',
            enum: ['ios', 'android', 'wxma'],
          },
          {
            name: 'build_version',
            in: 'query',
            description: 'build_version',
            required: false,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              originalRef: 'CassAppVersionVo',
              $ref: '#/definitions/CassAppVersionVo',
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/saas-api/app/widget/list': {
      get: {
        tags: ['widget-controller'],
        summary: '插件列表',
        operationId: 'getWidgetListUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'pageNum',
            in: 'query',
            required: false,
            type: 'integer',
            format: 'int32',
          },
          {
            name: 'pageSize',
            in: 'query',
            required: false,
            type: 'integer',
            format: 'int32',
          },
          {
            name: 'queryParams.createUserId',
            in: 'query',
            required: false,
            type: 'string',
          },
          {
            name: 'queryParams.createdAt',
            in: 'query',
            required: false,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'queryParams.description',
            in: 'query',
            required: false,
            type: 'string',
          },
          {
            name: 'queryParams.iconUrl',
            in: 'query',
            required: false,
            type: 'string',
          },
          {
            name: 'queryParams.id',
            in: 'query',
            required: false,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'queryParams.settings',
            in: 'query',
            required: false,
            type: 'string',
          },
          {
            name: 'queryParams.updateUserId',
            in: 'query',
            required: false,
            type: 'string',
          },
          {
            name: 'queryParams.updatedAt',
            in: 'query',
            required: false,
            type: 'integer',
            format: 'int64',
          },
          {
            name: 'queryParams.widgetName',
            in: 'query',
            required: false,
            type: 'string',
          },
          {
            name: 'queryParams.widgetType',
            in: 'query',
            required: false,
            type: 'string',
            enum: ['H5', 'MINI_APP'],
          },
          {
            name: 'searchCount',
            in: 'query',
            required: false,
            type: 'boolean',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              originalRef: 'IPaged«CassWidgetVo»',
              $ref: '#/definitions/IPaged«CassWidgetVo»',
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/saas-api/common/showErrorCode': {
      get: {
        tags: ['错误编码'],
        summary: '显示错误编码',
        operationId: 'showErrorCodeUsingGET',
        produces: ['*/*'],
        responses: {
          200: {
            description: 'OK',
            schema: { type: 'array', items: { type: 'string' } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
  },
  definitions: {
    CassAppVersionVo: {
      type: 'object',
      properties: {
        app_id: { type: 'integer', format: 'int64', description: '应用ID' },
        app_status: {
          type: 'integer',
          format: 'int32',
          description: '状态，0：新建，1：已上线，2：已下线',
        },
        app_store_id: { type: 'string', description: '苹果应用商店ID' },
        app_type: {
          type: 'string',
          description: '应用类型',
          enum: ['ios', 'android', 'wxma'],
        },
        build_version: {
          type: 'integer',
          format: 'int64',
          description: 'APP构建版本号',
        },
        description: { type: 'string', description: '描述' },
        download_url: { type: 'string', description: '下载地址' },
        ext_update_md5: { type: 'string', description: '增量更新MD5签名' },
        ext_update_url: { type: 'string', description: '增量更新下载地址' },
        force_flag: {
          type: 'integer',
          format: 'int32',
          description: '是否强制更新 0：否、1：是',
        },
        id: { type: 'integer', format: 'int64' },
        issue_status: {
          type: 'string',
          description:
            '发布状态，1：已发布，0：未发布， 安卓6家应用市场，需转成二进制判断每一位，顺序：应用宝、华为、小米、魅族、OPPO、VIVO',
        },
        md5: { type: 'string', description: '全量更新包MD5签名' },
        remind: { type: 'string', description: '升级提醒描述' },
        version: { type: 'string', description: 'APP版本号' },
      },
      title: 'CassAppVersionVo',
    },
    CassAppVo: {
      type: 'object',
      properties: {
        app_key: { type: 'string' },
        app_name: { type: 'string', description: '应用名称' },
        description: { type: 'string' },
        domain_id: {
          type: 'integer',
          format: 'int64',
          description: '固定值,10001',
        },
        icon_url: { type: 'string' },
        id: { type: 'integer', format: 'int64' },
        status: { type: 'integer', format: 'int32' },
        test2: {
          originalRef: 'CassAppVo',
          $ref: '#/definitions/CassAppVo',
        },
      },
      title: 'CassAppVo',
    },
    CassWidgetVo: {
      type: 'object',
      properties: {
        create_user_id: { type: 'string' },
        created_at: { type: 'integer', format: 'int64' },
        description: { type: 'string' },
        icon_url: { type: 'string' },
        id: { type: 'integer', format: 'int64' },
        settings: { type: 'string' },
        update_user_id: { type: 'string' },
        updated_at: { type: 'integer', format: 'int64' },
        widget_name: { type: 'string' },
        testObj: {
          type: 'object',
          properties: {
            create_user_id: { type: 'string' },
            force_flag: {
              type: 'integer',
              format: 'int32',
              description: '是否强制更新 0：否、1：是',
            },
            id: { type: 'integer', format: 'int64' },
            issue_status: {
              type: 'string',
              description:
                '发布状态，1：已发布，0：未发布， 安卓6家应用市场，需转成二进制判断每一位，顺序：应用宝、华为、小米、魅族、OPPO、VIVO',
            },
            widget_type: { type: 'string', enum: ['H5', 'MINI_APP'] },
          },
        },
        widget_type: { type: 'string', enum: ['H5', 'MINI_APP'] },
      },
      title: 'CassWidgetVo',
    },
    'IPaged«CassWidgetVo»': {
      type: 'object',
      properties: {
        extra: { type: 'string' },
        extra_num: { type: 'integer', format: 'int32' },
        has_next_page: { type: 'boolean' },
        has_prev_page: { type: 'boolean' },
        test1: {
          originalRef: 'CassWidgetVo',
          $ref: '#/definitions/CassWidgetVo',
        },
        test2: {
          originalRef: 'CassAppVo',
          $ref: '#/definitions/CassAppVo',
        },
        list: {
          type: 'array',
          items: {
            originalRef: 'CassWidgetVo',
            $ref: '#/definitions/CassWidgetVo',
          },
        },
        navigate_page_nums: {
          type: 'array',
          items: { type: 'integer', format: 'int32' },
        },
        page_num: { type: 'integer', format: 'int32' },
        page_size: { type: 'integer', format: 'int32' },
        pages: { type: 'integer', format: 'int32' },
        size: { type: 'integer', format: 'int32' },
        total: { type: 'integer', format: 'int64' },
      },
      title: 'IPaged«CassWidgetVo»',
    },
  },
};

export default new Promise<any>((resolve) => {
  // axios.get('http:///api-docs').then((res) => {
  //   resolve(res.data);
  // });
  resolve(res1);
});
