import serverConfig from '../../config';

export const combine = (obj, keyObj) => Object.assign({}, obj, keyObj);
export const isFunction = fn => fn && {}.toString.call(fn) === '[object Function]';

/**
 * access to path with format: 'to.this.path'
 * return parent if child is not found
 *
 * @param  {Object} obj
 * @param  {String} path
 * @return {Mixed}
 */
export const access = (obj, path) => {
    if (!path || typeof path !== 'string') return undefined;

    let result = obj;
    path.split('.').forEach((key) => {
        if (result[key]) result = result[key];
        else console.warn(`Cannot access "${path}" from `, obj);
    });

    return result;
};

/**
 * For sorting with a key
 * Usage: sort itemArray by 'order'
 *   itemArray.sort(compareWithKey('order'));
 *
 * @param  {String} key
 * @return {Number}
 */
export const compareWithKey = key => (a, b) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    // a must be equal to b
    return 0;
};

/**
 * Get server config from server-created cookie
 * If no key is provided, the entrie config is reutnred
 *
 * @param  {String} key
 * @return {Object}
 */
export const getConfig = (key) => {
    const config = (typeof document === 'undefined')
        ? serverConfig
        : JSON.parse(getCookieByName('config'));

    return key
        ? (config && config[key]) || null
        : config;
};

/**
 * Get a cookie by name
 *
 * @param  {String} name
 * @return {Mixed|null}
 */
export const getCookieByName = (name) => {
    if (typeof document === 'undefined') {
        return null;
    }

    const foundCookie = document.cookie
        .split('; ')
        .find(cookie => cookie.indexOf(`${name}=`) === 0);

    return (foundCookie)
        ? decodeURIComponent(foundCookie.split('=')[1])
        : null;
};
