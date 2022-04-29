const { merge } = require('webpack-merge')
const comm  = require('./webpack.comm.config.js')

module.exports = merge(comm, {
    mode: 'development',
    devtool: 'source-map', // 建立js映射文件，方便调试代码和错误
    // devServer本质是开启一个Express本地服务，让浏览器访问
    devServer: {
        hot: true, // 开启热更新 本质是开启一个socket长链接建立和浏览器之间的链接
        static: true, // 开发环境下使用 允许配置从目录提供静态文件的选项（默认是public文件夹）
        // static:'./public',//还可以配置直接配置路径或对象
        // host: "0.0.0.0",
        port: "9527",
        open: true, // 自动打开浏览器 也可以设置在package.json scripts webpack --open
        // compress: true, // 开启gzip压缩 针对开发模式下的文件
        proxy: {
            "/api": {
                target: "http://xxxxx:8888", // 要代理的地址
                pathRewrite: {
                    "^/api": "" // 重写路径，将/api去除掉
                },
                secure: false, // 默认情况下不接收转发到https的服务器上，默认值为true
                changeOrigin: true // 它表示是否更新代理后请求的headers中host地址；
            }
        }
    }
})