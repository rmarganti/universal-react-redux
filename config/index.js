module.exports = {
    appHost: process.env.APP_HOST || 'localhost',
    appPort: process.env.APP_PORT || 3000,
    apiHost: process.env.API_HOST || 'localhost',
    apiPort: process.env.API_PORT || 3030,
    isProduction: (process.env.NODE_ENV !== 'development'),
};
