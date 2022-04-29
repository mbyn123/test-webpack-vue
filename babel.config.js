module.exports = {
    presets: [
        [
            '@babel/preset-env'
        ],
        [
            '@babel/preset-typescript',
        ],
        ['@vue/cli-plugin-babel/preset']
    ],
    plugins: ['@vue/babel-plugin-jsx']
}