const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        // 配置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'APP_SERVE': JSON.stringify('localhost:8000'),
            }
        })
    ]
});