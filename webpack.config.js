const devConfig = require('./webpack/webpack.config.dev');
const productionConfig = require('./webpack/webpack.config.production');

module.exports = process.env.NODE_ENV === 'production' ? devConfig : productionConfig;
