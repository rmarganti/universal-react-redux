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
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader'],
            },
        ]),
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
        }),
    ],
    resolve: webpackBaseConfig.resolve,
};
