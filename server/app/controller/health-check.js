/*
* nginx 健康检查代码
*/

// 这个属性在pm2.js里会用到，用于暂停nginx健康检查来停止接收请求，然后再上线服务
exports.healthCheckStatusCode = 200;

exports.get = function () {
    this.status = exports.healthCheckStatusCode;
    this.body = exports.healthCheckStatusCode;
};

exports.head = function () {
    this.status = exports.healthCheckStatusCode;
    this.body = exports.healthCheckStatusCode;
};
