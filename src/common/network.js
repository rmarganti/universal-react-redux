/*
USAGE EXAMPLES:

Note tha `onError` can be either a function or an object
mapping response codes to the appropriate error handler

get(
    'http://api.com/example/route',
    response => console.log('Successful json response: ' + response),
    error => console.log('Error: ' + error.message)
);

get(
    'http://api.com/example/route',
    response => console.log('Successful json response: ' + response),
    {
        default: error => console.log('Default Error: ' + error.message),
        404: error => console.log('Not Found Error: ' + error.message),
        500: error => console.log('Server Error: ' + error.message),
    }
);

*/

import 'isomorphic-fetch';
import { isFunction } from './helpers';

/**
 * Make a GET request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 * @param  {Object}          additionalHeaders
 */
export const get = (url, onSuccess = null, onError = null, additionalHeaders = {}) =>
    goFetch(url, { method: 'GET', headers: additionalHeaders }, onSuccess, onError, additionalHeaders);

/**
 * Make a POST request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 * @param  {Object}          additionalHeaders
 */
export const post = (url, body, onSuccess = null, onError = null, additionalHeaders = {}) =>
    goFetch(url, { method: 'POST', body: JSON.stringify(body), headers: additionalHeaders }, onSuccess, onError);

/**
 * Make a file(s) POST request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 * @param  {Object}          additionalHeaders
 */
export const postFiles = (url, body, onSuccess = null, onError = null, additionalHeaders = {}) =>
    goFetch(url, {
        method: 'POST',
        body,
        headers: {
            Accept: 'application/vnd.api+json',
            ...additionalHeaders,
        },
    }, onSuccess, onError);

/**
 * Make a PATCH request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 * @param  {Object}          additionalHeaders
 */
export const patch = (url, body, onSuccess = null, onError = null, additionalHeaders = {}) =>
    goFetch(url, { method: 'PATCH', body: JSON.stringify(body), headers: additionalHeaders }, onSuccess, onError);

/**
 * Make a DELETE request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 * @param  {Object}          additionalHeaders
 */
export const destroy = (url, body, onSuccess = null, onError = null, additionalHeaders = {}) =>
    goFetch(url, { method: 'DELETE', body: JSON.stringify(body), headers: additionalHeaders }, onSuccess, onError);

/**
 * Make an API request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 */
const goFetch = (url, request, onSuccess = null, onError = null) => {
    const updatedRequest = {
        ...request,
        method: request.method || 'GET',
        credentials: request.credentials || 'include',
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
            ...request.headers,
        },
    };

    return fetch(url, updatedRequest)
        .then(checkStatus)
        .then(parseResponse)
        .then(response => handleSuccess(response, onSuccess))
        .catch(error => handleError(error, onError));
};

/**
 * Check the Response for server errors
 *
 * @param  {Response} response
 * @return {Response|Error}
 */
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

/**
 * Parse the reponse into JSON
 *
 * @param  {Response} response
 * @return {Object|null}
 */
const parseResponse = (response) => {
    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.match(/json/i)) {
        return response.json();
    }

    return response.text();
};

/**
 * Handle a successful response
 *
 * @param  {Object|null}     response
 * @param  {Function|Object} onSuccess
 */
const handleSuccess = (response, onSuccess) => onSuccess(response);

/**
 * Handle any Error that gets thrown, parsing JSON as necessary
 *
 * @param  {Error}           error
 * @param  {Function|Object} onError
 */
const handleError = (error, onError) => {
    if (onError === null) {
        // No handler has been defined. Let it bubble down.
        throw error;
    }

    return (error.response)
        ? error.response.json().then((json) => {
            const errors = (typeof json.errors !== 'undefined')
                ? json.errors.map(jsonError => jsonError.detail).join('\n')
                : json.message;
            const updatedError = new Error(errors);
            updatedError.response = error.response;
            updatedError.json = json;
            return directError(updatedError, onError);
        }).catch(() => directError(error, onError))
        : directError(error, onError);
};

/**
 * Pass error off to the correct handler. Additionally, return the Error so that
 * the PromiseMiddleware can keep a look out for authentication errors.
 *
 * @param  {Error}           error
 * @param  {Function|Object} onError
 */
const directError =  (error, onError) => {
    if (isFunction(onError)) {
        onError(error);
        return error;
    }

    if (error.response && error.response.status && error.response.status in onError) {
        onError[error.response.status](error);
        return (error.response.status === 401) ? null : error;
    }

    onError.default(error);
    return error;
};
