import { setDeauthenticated } from 'app/actions/auth';
import { startLoading, stopLoading } from 'app/actions/loading';
import { displayInfo } from 'app/actions/notification';

/**
 * If a Promise is dispatched, it will
 *
 * @param  {Function} dispatch
 * @return {Mixed}
 */
const promiseMiddleware = ({ dispatch }) => next => (action) => {
    if (!isPromise(action)) {
        return next(action);
    }

    dispatch(startLoading());

    const checkForAuthenticationError = (possibleError) => {
        if (!(possibleError instanceof Error) || !possibleError.response) {
            return;
        }

        if (possibleError.response.status === 401) {
            dispatch(displayInfo('Authentication expired'));
            dispatch(setDeauthenticated());
        }
    };

    return action
        .then((response) => {
            dispatch(stopLoading());
            checkForAuthenticationError(response);
        })
        .catch(() => dispatch(stopLoading()));
};

/**
 * Determines if an Object is a Promise
 *
 * @param  {Mixed}   val
 * @return {Boolean}
 */
const isPromise = val => (val && typeof val.then === 'function');

export default promiseMiddleware;
