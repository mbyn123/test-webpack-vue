const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// const Terser = require('terser-webpack-plugin') // webpack v5 自动安装

const comm = require('./webpack.comm.config.js')

module.exports = merge(comm, {
    mode: 'production',
    optimization: {
        // 这个选项专门配置代码压缩
        minimizer: [
            // 压缩 css
            new CssMinimizerWebpackPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
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
        // 提取单独的css文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[fullhash:6].css',
        }),
    ]
})