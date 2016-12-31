import * as helpers from 'app/common/helpers';

const config = {
    appHost: helpers.getEnv('APP_HOST', 'http://localhost'),
    appPort: helpers.getEnv('APP_PORT', 3000),
    apiHost: helpers.getEnv('API_HOST', 'http://localhost'),
    apiPort: helpers.getEnv('API_PORT', 3030),
    isProduction: (helpers.getEnv('NODE_ENV') !== 'development'),
};

export default config;

/**
 * Get server config from server-created cookie
 * If no key is provided, the entrie config is reutnred
 *
 * @param  {String} key
 * @return {Object}
 */
export const getConfig = key => (
    (typeof key !== 'undefined')
        ? (config && config[key]) || null
        : config
);
