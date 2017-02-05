import { getId, loadJsonApiEntityData, updateEntitiesMeta } from 'giadc-redux-json-api';

import actionNames from 'app/action-names';
import { displayError, displayInfo } from 'app/actions/notification';
import { get, post } from 'app/common/network';
import api from 'app/config/api';

/**
 * Set the authenticated state
 *
 * @param  {Number} expiresIn
 * @param  {String} expiresAt
 * @return {Object} Redux action
 */
export const setAuthenticated = (expiresAt, expiresIn) => ({
    type: actionNames.SET_AUTHENTICATED,
    expiresAt,
    expiresIn,
});

/**
 * Set Deauthenticated set
 *
 * @return {Object} Redux action
 */
export const setDeauthenticated = () => ({
    type: actionNames.SET_DEAUTHENTICATED,
});

/**
 * Log a User in
 *
 * @param  {string} username
 * @param  {string} password
 */
export const logIn = (username, password) => dispatch => dispatch(post(
    api.logIn,
    { username, password },
    (response) => {
        dispatch(authenticationSuccess(response));
        dispatch(fetchCurrentUser());
    },
    {
        default: error => dispatch(displayError(error.message)),
        401: () => dispatch(displayError('Invalid credentials')),
    }
));

/**
 * Refresh the Auth token
 */
export const refreshAuth = () => dispatch => dispatch(get(
    api.refreshAuth,
    response => dispatch(authenticationSuccess(response)),
    () => dispatch(setDeauthenticated())
));

/**
 * Handle a successful login or auth refresh
 *
 * @param  {Object} response JSON response
 */
const authenticationSuccess = response => (dispatch) => {
    const now = new Date();
    const expiration = new Date(response.expires_at);
    const expiresIn = (expiration.getTime() - now.getTime());

    dispatch(setAuthenticated(response.expires_at, expiresIn));
    dispatch(setAuthRefreshTimeout(expiresIn));
};

/**
 * Authorize a Client
 *
 * @return {Function} thunk
 */
export const authorizeClient = () => dispatch => dispatch(get(
    `${api.authorizeClient}${location.search}`,
    response => dispatch(authorizeClientSuccess(response)),
    error => dispatch(displayError(error.message))
));

/**
 * Handle a successful authorizeClient()
 *
 * @param  {Object}  response  JSON response from API
 * @return {Function}          thunk
 */
const authorizeClientSuccess = response => (dispatch) => {
    window.location.replace(response.location);
    dispatch(displayInfo('Redirecting...'));
};

/**
 * Set a time to refresh the authentication
 *
 * @param  {Number}   timeout Refresh timeout in ms
 * @return {Function} thunk
 */
export const setAuthRefreshTimeout = timeout => (dispatch) => {
    if (timeout < 0) {
        return;
    }

    setTimeout(() => dispatch(refreshAuth()), timeout);
};

/**
 * Log the current User out
 *
 * @return {Function} thunk
 */
export const logOut = () => dispatch => dispatch(get(
    api.logOut,
    () => {
        dispatch(setDeauthenticated());
        dispatch(updateEntitiesMeta('users', 'currentUser', null));
        location.reload();
    },
    error => dispatch(displayError(error.message))
));

/**
 * Fetch the current User (along with their Subscriptions and Permssions)
 *
 * @return {Function} thunk
 */
export const fetchCurrentUser = () => dispatch => dispatch(get(
    api.fetchCurrentUser,
    response => dispatch(fetchCurrentUserSuccess(response)),
    error => dispatch(displayError(error.message)),
));

/**
 * Handle a successful fetchCurrentUser()
 *
 * @param  {Object}   response JSON object
 * @return {Function} thunk
 */
export const fetchCurrentUserSuccess = response => (dispatch) => {
    dispatch(loadJsonApiEntityData(response));
    dispatch(updateEntitiesMeta('users', 'currentUser', getId(response)));
};
