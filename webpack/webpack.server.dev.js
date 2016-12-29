const Express = require('express');
const webpack = require('webpack');

const config        = require('../src/config/app');
const webpackConfig = require('./webpack.config.dev');

const compiler      = webpack(webpackConfig);
const host          = config.host || 'localhost';
const port          = (Number(config.appPort) + 1) || 3001;
const serverOptions = {
    contentBase: `http://${host}:${port}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
};

const app = new Express();

/**
 * Enabled hot reloading
 */
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('➡ 🚧  \x1b[32mWebpack development server listening at http://%s:%s', host, port);
    }
});
