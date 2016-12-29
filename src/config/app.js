import { getEnv } from 'app/common/helpers';

module.exports = {
    appHost: getEnv('APP_HOST', 'localhost'),
    appPort: getEnv('APP_PORT', 3000),
    apiHost: getEnv('API_HOST', 'localhost'),
    apiPort: getEnv('API_PORT', 3030),
    isProduction: (getEnv('NODE_ENV') !== 'development'),
};
