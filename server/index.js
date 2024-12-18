/*
* @Author: Lian Xin
* @Last Modified by:   Lian Xin
* @Last Modified time: 2018-07-16
*/

const config = require('./config');
const kwai = require('@lianxin/node-core')(config);
const httpsCheck = require('./middleware/httpsCheck');

kwai.use(httpsCheck);

// 错误日志记录
kwai.on('error', function (err, ctx) {
    if (ctx.request) {
        err.request = ctx.request;
    }

    kwai.logger.error(err);
});

kwai.start();

console.log(`[${new Date().toLocaleString()}] listening on port: ${config.port}`);
