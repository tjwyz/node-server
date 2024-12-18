/**
 * 测试环境配置
 */

const defaultConfig = {
    // 请求代理模块设置
    proxy: {
        // request代理请求超时设置
        requestTimeout: 30 * 1000,
        useMock: false,
        // 后端服务接口配置
        API: {
            webAPI: 'http://api.web.com',
            payAPI: ['http://api1.pay.com', 'http://api2.pay.com', 'http://api3.pay.com'],
        },
    },
};

module.exports = defaultConfig;
