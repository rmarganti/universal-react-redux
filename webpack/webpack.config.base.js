const path   = require('path');

const host = (process.env.APP_HOST || 'localhost');
const port = (+process.env.APP_PORT) || 3000;

module.exports = {
    entry: [
        // 'babel-polyfill', // might need later to support old browsers
        path.join(__dirname, '../src/client'),
    ],
    output: {
        path: path.join(__dirname, '../static'),
        filename: (process.env.NODE_ENV === 'production') ? 'bundle.min.js' : 'bundle.js',
        publicPath: `${host}:${port}/static/`,
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
                include: path.join(__dirname, '..'),
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)([?]?.*)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    resolve: {
        alias: {
            app: path.join(__dirname, '../src'),
        },
        extensions: ['', '.js', '.jsx'],
    },
};
