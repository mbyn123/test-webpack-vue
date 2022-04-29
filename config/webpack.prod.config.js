const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const comm  = require('./webpack.comm.config.js')

module.exports = merge(comm, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // 打包上线的时候使用
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
    ]
})