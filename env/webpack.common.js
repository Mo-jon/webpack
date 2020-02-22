const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 此处官方文档有坑
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    // 管理输出
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 热加载(webpack-dev-server)
    devServer: {
        contentBase: './dist',
        hot: true,
        host: 'localhost',
        port: 8000,
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(), // 此处官方文档有坑
        new HtmlWebpackPlugin({
            title: '这是一个webpack学习文件',
            favicon: 'src/assets/favicon.ico',
            filename: 'index.html',
            template: 'src/assets/index.html',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    // stats: {
    //     children: false // 修复 Entrypoint undefined = index.html
    // },
    module: {
        rules: [{
            // 加载 .css 文件
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            // 加载 .vue 文件
            test: /\.vue$/,
            use: ['vue-loader']
        }]
    }
};