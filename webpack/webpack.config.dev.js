const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.base');

const host = process.env.APP_HOST || 'localhost';
const port = (+process.env.APP_PORT + 1) || 3001;

module.exports = {
    devtool: 'eval',

    entry: [
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
    ].concat(webpackBaseConfig.entry),

    output: webpackBaseConfig.output,

    module: {
        loaders: webpackBaseConfig.module.loaders.concat([
            {
                test: /\.global\.s?css$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader'],
            },
            {
                test: /^((?!\.global).)*\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
                    'sass-loader',
                ],
            },
        ]),
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],
    resolve: webpackBaseConfig.resolve,
};
