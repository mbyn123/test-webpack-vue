const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取单独css文件

/**
 * loader是用于特定的模块类型进行转换
 * plugin可以用于执行更加广泛的任务，比如打包优化，资源管理，环境变量注入等
 */
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    target: 'web',

    entry: './src/main.js', // 项目入口文件
    // watch: true, // 开启监听数据变化，也可以设置在package.json scripts webpack --watch
    output: {
        path: path.resolve(__dirname, '../build'), // 打包输出文件
        filename: 'js/bundle.js', // 打包文件名称
        // assetModuleFilename: "img/[name]_[hash:6][ext]" // webpack5 统一设置打包文件路径名称
    },

    resolve: {
        // 设置默认后缀名，在import引入文件时可以不用写后缀
        extensions: ['.js', '.json', '.mjs', '.vue', '.ts', '.jsx', '.tsx'],
        alias: {
            "@": path.resolve(__dirname, "../src") // 设置别名
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x$/,
                exclude: /node_modules/, // 排除 node_modules 检测
                use:[
                    {
                        loader: 'babel-loader',
                        options:{
                            cacheDirectory: true, // 开启目录缓存功能
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-preset-env')
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader']
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: "asset",
                generator: {
                    filename: "img/[name]_[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: "font/[name]_[hash:6][ext]"
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: './public/index.html', // 设置html模板
            title: 'test-webpack' // 设置页面标题
        }),
        // 设置全局变量
        new DefinePlugin({
            BASE_URL: "'./'", // 此处设置的是favicon.ico路径
            __VUE_OPTIONS_API__: true, // 对vue2进行适配
            __VUE_PROD_DEVTOOLS__: false // 生产环境是否使用DEVTOOLS工具
        }),

        new VueLoaderPlugin()
    ]
}