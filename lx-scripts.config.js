const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    cdnPrefix: process.env.USE_LOCAL_ASSETS === 'true' || process.env.NODE_ENV !== 'production'
        ? '/'
        : '//ali.static.yximgs.com',
    assetsDir: 'static/life',
    chainWebpack(config) {
        if (process.env.GEN_WEBPACK_BUNDLE_ANALYZER === 'true') {
            config.plugin('analyzer').use(BundleAnalyzerPlugin, [{
                analyzerMode: 'static',
                openAnalyzer: false,
            }]);
        }
    },
};
