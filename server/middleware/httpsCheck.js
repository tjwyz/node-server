/**
 * 重定向https钩子
 */

// 可以豁免的列表，这只是个demo
const HTTP_WHITE_LIST = ['/_demo/page1'];

function shouldCheckHttps(ctx) {
    const header = ctx.request.header;

    return (
        ctx.method === 'GET'
        && header.accept
        // html类型请求
        && header.accept.indexOf('text/html') >= 0
        // 不能直接判断http协议，因为nginx反向过来的请求都是http协议的，可以通过ks-port判断原始协议端口
        // 原始http协议端口线上为80，预上线为8899
        && (+header['ks-port'] === 80 || +header['ks-port'] === 8899)
    );
}

module.exports = async function (ctx, next) {
    if (process.env.NODE_ENV === 'production' && shouldCheckHttps(ctx) && !HTTP_WHITE_LIST.includes(ctx.request.path)) {
        ctx.status = 301;
        const httpsHref = ctx.href.replace('http:', 'https:');
        ctx.redirect(httpsHref);

        return;
    }

    await next();
};
