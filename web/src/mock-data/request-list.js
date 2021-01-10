export const info = {
  // 描述信息
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
  // 当前主机
  host: 'xxx.xxx.xx.xx:xxxx',
  // 当前的基本路径
  basePath: '/xxx',
  // 每个tag的信息
  tags: [
    { name: 'Gearbox', description: 'Gearbox Controller' },
    { name: 'VIN', description: 'Ocr Vin Controller' },
    { name: 'Brand', description: 'Brand Controller' },
    { name: '错误编码', description: 'Error Code Service' },
  ],
  // 接口信息
  paths: {
    // 接口
    '/gearbox/annual': {
      post: {
        // 所属的tag
        tags: ['Gearbox'],
        // 该接口描述
        desc: '查年份',
        // 用于前端通过脚本定义名字，当然也可以不传，由前端定义
        operationId: 'queryCarModelByVinUsingGET',
        // 传给后台的参数
        parameters: [
          {
            name: 'brand',
            // 用于区分  path/1 和 path/id=1
            in: 'query',
            description: 'brand',
            required: true,
            type: 'string',
          },
          {
            name: 'carSeri',
            in: 'query',
            description: 'carSeri',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: { type: 'array', items: { type: 'string' } },
          },
          201: { description: 'Created' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/gearbox/carmodel_v': {
      get: {
        tags: ['Gearbox'],
        desc: '通过vinCode查询车型',
        operationId: 'queryCarModelByVinUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'vinCode',
            in: 'query',
            description: 'vinCode',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/SalesModelResultVo',
                originalRef: 'SalesModelResultVo',
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Not Found' },
        },
        deprecated: false,
      },
    },
    '/gearbox/query_l': {
      get: {
        tags: ['Gearbox'],
        desc: '通过levelid查询变速箱信息',
        operationId: 'getGearboxByLevelIdUsingGET',
        produces: ['*/*'],
        parameters: [
          {
            name: 'levelId',
            in: 'query',
            description: 'levelId',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/VinQueryResultVo',
                originalRef: 'VinQueryResultVo',
              },
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

  // 字段类型描述
  definitions: {
    // 每个类型 modal 定义，如果能把 “是否必传” 字段也添加上去更好
    SalesModelResultVo: {
      type: 'object',
      properties: {
        ac: { type: 'string' },
        auto_ac: { type: 'string' },
        brand_code: { type: 'string' },
        brand_name: { type: 'string' },
        country: { type: 'string' },
        create_user_id: { type: 'string' },
        model: { type: 'string' },
      },
      title: 'SalesModelResultVo',
    },
    // 注意类型与类型间的调用
    VinQueryResultVo: {
      type: 'object',
      properties: {
        create_user_id: { type: 'string' },
        created_at: { type: 'integer', format: 'int64' },
        id: { type: 'integer', format: 'int64' },
        update_user_id: { type: 'string' },
        updated_at: { type: 'integer', format: 'int64' },
        vin_code: { type: 'string' },
        vin_info: {
          type: 'array',
          items: {
            $ref: '#/definitions/NameValuePair',
            originalRef: 'NameValuePair',
          },
        },
      },
      title: 'VinQueryResultVo',
    },
    NameValuePair: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        name: { type: 'string' },
        value: { type: 'string' },
      },
      title: 'NameValuePair',
    },
  },
};
