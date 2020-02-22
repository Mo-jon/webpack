# webpack
这是一个webpack学习项目

一、创建项目文件夹

二、使用npm创建pakage.json

	npm init -y   // 默认方式创建 

三、创建入口文件

	1、创建 src/index.js

	2、要在 index.js 中打包 lodash 依赖，需要在本地安装 library
	  npm install lodash --save
	  src/index.js 中添加 import _ from 'lodash';
	  
	3、调整 package.json 文件，"private": true，并移除 main 入口

四、添加webpack、配置 webpack.config.js

	1、npm install webpack webpack-cli --save-dev

	2、创建 webpack.config.js，内容如下
	    const path = require('path');

	    module.exports = {
  	        entry: {
	            app: './src/index.js'
	        },
  	        output: {
    	            filename: 'index.js',
    	            path: path.resolve(__dirname, 'dist')
  	        }
	    };

	注意：npx webpack --config webpack.config.js （打包命令）

五、修改打包执行命令

	1、在 pakage.json 中添加
	     "scripts": {
    		"build": "webpack"
 	      }
	2、npm run build （修改后的打包命令）

--------------------------------------------------------------------------------------------------

六、自动创建 index.html 文件

	1、npm install  html-webpack-plugin  --save-dev

	2、创建 src/assets/favicon.ico、src/assets/index.html

	3、修改 webpack.config.js 添加以下配置
	    const HtmlWebpackPlugin = require('html-webpack-plugin');
	    plugins: [
      	        new HtmlWebpackPlugin({
        	   title: '这是一个webpack学习文件',        //  标题
           	   favicon: 'src/assets/favicon.ico',          //  图标
                   filename: 'index.html',		         //  文件名
            	   template: 'src/assets/index.html',       //  模板
      	        }),
    	    ],
	注意：HtmlWebpackPlugin 自动创建全新的 /dist/index.html 文件，所有的 bundle 会自动添加到 html 中

七、自动清理 /dist 文件夹（此处官方文档有坑，注意导入模式）

	npm install clean-webpack-plugin --save-dev
	修改 webpack.config.js 添加以下配置
	    const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
	    plugins: [
      	        new CleanWebpackPlugin()
    	    ],
	注意：clean-webpack-plugin 自动清理 /dist 的旧文件

八、添加热重载

	1、npm install  webpack-dev-server --save-dev

	2、修改 webpack.config.js 添加以下配置
	    const webpack = require('webpack');
	    plugins: [
	        new webpack.NamedModulesPlugin(),
	        new webpack.HotModuleReplacementPlugin()
	    ],
	    devServer: {
	        contentBase: './dist',
	        hot: true，
	        host: 'localhost',
	        port: 8000,
	    },

	3、修改 packege.json 添加以下配置
	    "scripts":{
	        "start": "webpack-dev-server --open",
	    }
	执行命令 npm run start

九、配置运行环境、环境变量

	1、npm install webpack-merge --save-dev
	
	2、创建 env/webpack.common.js、env/webpack.dev.js、env/webpack.prod.js
	     设置 webpack.common.js=webpack.config.js
	     	output: {
    	            filename: 'index.js',
    	            path: path.resolve(__dirname, '../dist')
  	       	 }
		 
	     设置 webpack.dev.js
		const merge = require('webpack-merge');
		const common = require('./webpack.common.js');
		const webpack = require('webpack');

		module.exports = merge(common, {
		    mode: 'development',
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
		
	     设置 webpack.prod.js
		const merge = require('webpack-merge');
		const common = require('./webpack.common.js');
		const webpack = require('webpack');

		module.exports = merge(common, {
		    mode: 'production',
    		    plugins: [
       		        // 配置环境变量
        		new webpack.DefinePlugin({
            		   'process.env': {
                		'NODE_ENV': JSON.stringify('production'),
                		'APP_SERVE': JSON.stringify('guiqiang.net'),
           		    }
        		})
    		    ]
		});
		
	3、修改 package.json
	     "scripts": {
    	          "build": "webpack --config env/webpack.prod.js",
    	          "start": "webpack-dev-server --open --config env/webpack.dev.js",
    	          "start:prod": "webpack-dev-server --open --config env/webpack.prod.js",
    	          "test": "echo \"Error: no test specified\" && exit 1"
  	      },

	注意：npm run start              // 运行 dev 配置环境
	          npm run start:prod      // 运行 prod 配置环境
	         (webpack.config.js不加载、可删除)

十、使用 source map，追踪源码文件

	修改 env/webpack.dev.js 添加以下配置
	    merge(common, {
	        devtool: 'inline-source-map',
	    }
	修改 env/webpack.prod.js 添加以下配置
	    merge(common, {
	        devtool: 'source-map', 
	    }

---------------------------------------------------------------------------------------------------

十一、配置成vue项目

	1、npm install vue --save
	   npm install vue-loader --save-dev
	   npm install vue-template-compiler --save-dev

	2、修改 webpack.config.js 添加以下配置
	     const VueLoaderPlugin = require('vue-loader/lib/plugin');
	     module: {
        	rules: [ {
            	  test: /\.vue$/,
            	  use: ['vue-loader']
        	}]
    	     }

	3、修改 main.js
	    import _ from 'lodash';
	    import Vue from 'vue'
	    import App from './App.vue'

	    // 定义全局属性
	    Vue.config.productionTip = false
	    Vue.prototype.$env = process.env;

	    new Vue({
  	        render: h => h(App)
	    }).$mount('#app')

	4、创建 App.vue

十二、配置css加载

	1、npm install style-loader --save-dev
	   npm install css-loader --save-dev

	2、修改 webpack.config.js 添加以下配置
	     module: {
        	rules: [ {
            	   test: /\.css$/,
            	   use: [
		      'style-loader',
		      'css-loader'
	           ]
        	}]
    	     }










