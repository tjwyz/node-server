/*
 * @file: pm2启动器，用于线上或测试环境启动pm2实例
 * 使用方式 node pm2.js [pm2指令，如:start|restart|reload|stop|delete] [pm2实例名 如:node-app] [其他传递到node服务的参数]
 * @Author: Lian Xin
 */

const child_process = require('child_process');
const healthCheck = require('./app/controller/health-check');
const path = require('path');
const pm2Config = require('./config').pm2;
const supportedPm2Commands = ['restart', 'reload', 'delete', 'stop'];

const globalNodeModules = child_process.execSync('npm root -g').toString();
const pm2Path = path.join(globalNodeModules.trim(), 'pm2');

// 只require global pm2, 防止造成版本不一致带来的问题
const pm2 = require(pm2Path);

pm2.connect(function (err) {
    if (err) {
        throw err;
    }

    // 通过第二个参数获取当前要执行的指令，默认为start
    const param = String(process.argv[2]).toLowerCase();

    // 通过第三个参数获取要设置的pm2实例名
    if (process.argv[3]) {
        pm2Config.name = process.argv[3];
        console.log(`[${new Date().toLocaleString()}] using pm2 name: ${pm2Config.name}`);
    }

    // 把其他输入的参数透传给node
    const inputArgs = process.argv.slice(4);
    if (inputArgs.length) {
        pm2Config.args = inputArgs;
        console.log(`[${new Date().toLocaleString()}] got node args: ${inputArgs}`);
    }

    if (supportedPm2Commands.includes(param)) {
        pm2[param](pm2Config.name, callback);
        console.log(`[${new Date().toLocaleString()}] running ${param} for ${pm2Config.name}`);
    } else {
        // 先修改Status为400
        healthCheck.healthCheckStatusCode = 400;

        setTimeout(() => {
            pm2.delete(pm2Config.name, function (err) {
                pm2.start(pm2Config, callback);
                console.log(`[${new Date().toLocaleString()}] running start for ${pm2Config.name}`);
            });
            console.log(`[${new Date().toLocaleString()}] deleting pm2 instance: ${pm2Config.name}`);
        }, 6000);
        console.log(`[${new Date().toLocaleString()}] waiting for 6s to complete connected http request`);
    }
});

function callback(err) {
    pm2.disconnect();

    if (err) {
        throw err;
    }
}
