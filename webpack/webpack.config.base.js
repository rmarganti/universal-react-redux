const path = require('path');

const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

module.exports = {
    entry: [
        // 'babel-polyfill', // might need later to support old browsers
        path.join(__dirname, '../src/app'),
    ],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: (process.env.NODE_ENV === 'production') ? 'bundle.min.js' : 'bundle.js',
        publicPath: `http://${host}:${port}/dist/`, // path to distribute compiled code
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
            styleConfig: path.join(__dirname, '../src/globalStyles/_config.scss'),
        },
        extensions: ['', '.js', '.jsx'],
    },
};
