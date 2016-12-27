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

import { isFunction } from './helpers';

/**
 * Make a GET request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 */
export const get = (url, onSuccess = null, onError = null) =>
    goFetch(url, { method: 'GET' }, onSuccess, onError);

/**
 * Make a POST request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 */
export const post = (url, body, onSuccess = null, onError = null) =>
    goFetch(url, { method: 'POST', body: JSON.stringify(body) }, onSuccess, onError);

/**
 * Make a file(s) POST request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 */
export const postFiles = (url, body, onSuccess = null, onError = null) =>
    goFetch(url, {
        method: 'POST',
        body,
        headers: {
            Accept: 'application/vnd.api+json',
        },
    }, onSuccess, onError);

/**
 * Make a PATCH request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 */
export const patch = (url, body, onSuccess = null, onError = null) =>
    goFetch(url, { method: 'PATCH', body: JSON.stringify(body) }, onSuccess, onError);

/**
 * Make a DELETE request
 *
 * @param  {String}          url
 * @param  {Object}          request
 * @param  {Function}        onSuccess
 * @param  {Function|Object} onError
 */
export const destroy = (url, body, onSuccess = null, onError = null) =>
    goFetch(url, { method: 'DELETE', body: JSON.stringify(body) }, onSuccess, onError);

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
        credentials: request.credentials || 'same-origin',
        headers: request.headers || {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/json',
        },
    };

    fetch(url, updatedRequest)
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
const handleSuccess = (response, onSuccess) => {
    onSuccess(response);
};

/**
 * Handle any Error that gets thrown, parsing JSON as necessary
 *
 * @param  {Error}           error
 * @param  {Function|Object} onError
 */
const handleError = (error, onError) => {
    if (onError === null) {
        throw error;
    }

    if (error.response) {
        error.response.json().then((json) => {
            const errors = json.errors.map(jsonError => jsonError.detail).join('\n');
            const updatedError = new Error(errors);
            updatedError.response = error.response;
            directError(updatedError, onError);
        }).catch(() => directError(error, onError));

        return;
    }

    directError(error, onError);
};

/**
 * Pass error off to the correct handler
 *
 * @param  {Error}           error
 * @param  {Function|Object} onError
 */
const directError =  (error, onError) => {
    if (isFunction(onError)) {
        return onError(error);
    }

    if (error.response && error.response.status && error.response.status in onError) {
        return onError[error.response.status](error);
    }

    return onError.default(error);
};
