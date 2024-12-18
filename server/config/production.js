/**
 * 线上环境配置
 */

const defaultConfig = {
    // 请求代理模块设置
    proxy: {
        useMock: false,
        // 后端服务接口配置
        API: {
            webAPI: ['http://api.web.com', 'http://api1.web.com'],
        },
    },
};

module.exports = defaultConfig;
