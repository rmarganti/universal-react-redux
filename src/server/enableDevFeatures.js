const webpack       = require('webpack');
const webpackConfig = require('../../webpack/webpack.config.dev');

const compiler      = webpack(webpackConfig);
const host          = process.env.APP_HOST || 'localhost';
const port          = Number(process.env.APP_PORT) || 3000;
const serverOptions = {
    contentBase: `${host}:${port}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
};

export default (app) => {
    app.use(require('webpack-dev-middleware')(compiler, serverOptions));
    app.use(require('webpack-hot-middleware')(compiler));
};
