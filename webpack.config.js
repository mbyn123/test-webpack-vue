const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader/dist/index')

/**
 * loader是用于特定的模块类型进行转换
 * plugin可以用于执行更加广泛的任务，比如打包优化，资源管理，环境变量注入等
 */

module.exports = {
    mode: 'development',
    devtool: 'source-map', // 建立js映射文件，方便调试代码和错误
    entry: './src/main.js', // 项目入口文件
    output: {
        path: path.resolve(__dirname, './build'), // 打包输出文件
        filename: 'js/bundle.js', // 打包文件名称
        // assetModuleFilename: "img/[name]_[hash:6][ext]" // webpack5 统一设置打包文件路径名称
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 1.loader写法(语法糖)
                // loader: 'css-loader
                use: [
                    // 2.完整的写法
                    // {loader:'css-loader',options:{}}
                    // loader的执行顺序是从右->左
                    'style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    // 自动添加浏览器前缀  
                                    // require('autoprefixer')
                                    // 包含上功能，并且包含其它功能。例如支持css新语法特性
                                    require('postcss-preset-env')
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 outputPath: "img", // 打包路径
            //                 name: "[name]_[hash:6].[ext]", // 配置图片打包的名称
            //             }
            //         },
            //     ],
            //     dependency: { not: ["url"] },
            // },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use: {
            //         /*使用url-loader 
            //         1. css-loader的版本须降到6.0版本以下,不然css背景 图片加载不出来;
            //         2. 会将图片转换成base64的url，可以减少向服务器发送的请求，但是图片太大转base64会阻塞页面加载
            //         */
            //         loader: "url-loader",
            //         options: {
            //             name: "img/[name]_[hash:6].[ext]",
            //             limit: 10 * 1024 // 只对10kb以下的图片进行base64转码
            //         }
            //     }
            // },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                /* webpack5中专门用来处理图片文件资源的配置 
                   1. asset/resource 相当于file-loader
                   2. asset/inline  相当于url-loader
                   3. asset/source  相当于raw-loader
                   4. asset 在resource和inline中自动选择，之前通过url-loader实现，并配置资源体积限制实现
                */
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
                // use: {
                //     loader:'file-loader', // 打包字体文件css-loader版本降到6.0以下，不然资源会重复打包
                //     options:{
                //         name:"font/[name]-[hash:4].[ext]"
                //     }
                // },
                type: 'asset/resource',
                generator: {
                    filename: "font/[name]_[hash:6][ext]"
                }
            },
            // {
            //   test: /\.js$/,
            //   use: {
            //     loader: "babel-loader",
            //     options: {
            //       // plugins: [
            //       //   "@babel/plugin-transform-arrow-functions", // 需要单独下载
            //       //   "@babel/plugin-transform-block-scoping",
            //       // ]
            //       presets: [
            //         "@babel/preset-env"
            //       ]
            //     }
            //   }
            // }
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'test-webpack'
        }),
        // 设置全局变量
        new DefinePlugin({
            BASE_URL: "'./'",
            __VUE_OPTIONS_API__: true, // 对vue2进行适配
            __VUE_PROD_DEVTOOLS__: false // 生产环境是否使用DEVTOOLS工具
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public", // 要拷贝的文件夹
                    to: './', // 拷贝到那个位置
                    globOptions: {
                        ignore: [
                            "**/index.html", // 过滤不需要拷贝的文件
                        ]
                    }
                }
            ]
        }),
        new VueLoaderPlugin()
    ]
}