const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');

module.exports = {
    entry: baseConfig.entry,
    output: baseConfig.output,

    module: {
        loaders: baseConfig.module.loaders.concat([
            {
                test: /\.global\.s?css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?sourceMap!sass-loader'
                ),
            },
            {
                test: /^((?!\.global).)*\.s?css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
                ),
            },
        ]),
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: false },
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],

    resolve: baseConfig.resolve,
};
