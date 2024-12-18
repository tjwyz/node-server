const path = require('path');

const isDevOrTestEnv = process.env.NODE_ENV !== 'production';
const cdnPrefix = process.env.cdn_prefix || '//static.yximgs.com/';

module.exports = {
    // 服务端口
    port: 8040,

    // 项目根目录位置
    appPath: path.join(__dirname, '../app'),

    // 调试模块: true时会详细记录每个接口请求信息
    debugMode: isDevOrTestEnv,

    // 静态资源目录位置
    static: {
        root: path.join(__dirname, '../../dist/'),
        includes: ['static'], // 静态目录白名单, dist下的其它目录不会当做静态文件处理
        // exclues: ['template'] // 静态目录黑名单, 目前不需要用
    },
    template: {
        // 模板设置, 兼容art 和 pug, 默认art, pug的话需要指定.pug文件
        art: {
            root: path.join(__dirname, '../../dist/template'),
            debug: process.env.NODE_ENV !== 'production',
            defaults: {
                // art template的默认设置
            },
        },
        pug: {
            // 没有用pug的话就不用配置了
            viewPath: path.join(__dirname, '../../dist/template'),
        },
        injectTemplate: {
            staticPrefix: isDevOrTestEnv ? '' : cdnPrefix,
            cdnPrefix,
        },
    },
    // 请求代理模块设置
    proxy: {
        // 是否使用mock
        // 为方面测试, 避免频繁修改conifg, 在非生产环境时, 可以在页面的querystring中增加 _mock=1 参数来强制使用mock数据
        useMock: false,
        // request代理请求超时设置
        requestTimeout: 30 * 1000,
        // api健康检查频率, 默认或为0则不检查
        healthCheckFrequency: 60000,
        // mock数据根目录
        mockPath: path.join(__dirname, '../mockData'),
        // 后端服务接口配置
        API: {
            webAPI: 'http://api.web.com',
            payAPI: ['http://api.pay.com'],
        },
    },
    // log模块配置, 如果没有该属性将不支持log服务
    logger: {
        // log存储位置
        logPath: process.env.log_path || path.join(__dirname, '../../log'),
        // log文件名
        logName: 'life',
        // 是否默认在console输出，默认在非生产环境时console也输出log，方便调试
        consoleOutput: isDevOrTestEnv,
    },
    pm2: {
        name: 'life',
        script: path.join(__dirname, '../index.js'),
        execMode: 'cluster',
        watch: isDevOrTestEnv,
        ignore_watch: ['node_modules', 'log', 'dist', 'build'],
        instances: process.env.worker_num || 1,
        max_memory_restart: '1024M',
        kill_timeout: 2000,
        max_restarts: 6,
        autorestart: true,
        restart_delay: 1000,
    },
    kafka: {
        accessLog: {
            enable: true,
        },
        pm2Log: {
            enable: true,
            frequency: 60, // 单位秒
        },
        apiLog: {
            enable: true,
        },
        eventLog: {
            enable: true,
        },
    },
};
