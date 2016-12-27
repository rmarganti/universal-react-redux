import actionNames from 'app/action-names';

/**
 * Display a Notification
 *
 * @param {String} level   "error" or "info"
 * @param {String} message
 */
export const displayNotification = (level, message) => ({
    type: actionNames.DISPLAY_NOTIFICATION,
    level,
    message,
});

/**
 * Hide the currently-displayed Notification
 */
export const clearNotification = () => ({
    type: actionNames.CLEAR_NOTIFICATION,
});

/**
 * Display a Notification with a timeout
 *
 * @param {String} level    "error" or "info"
 * @param {String} message  The message to display
 * @param {Number} timeout  Notification timeout in milleseconds
 */
export const displayNotificationWithTimeout = (level, message, timeout = 7500) => (dispatch) => {
    dispatch(displayNotification(level, message));

    return setTimeout(() => {
        dispatch(clearNotification());
    }, timeout);
};

/**
 * Display an error Notification
 *
 * @param {String} message
 */
export const displayError = (message, timeout = undefined) => dispatch =>
    dispatch(displayNotificationWithTimeout('error', message, timeout));

/**
 * Display an information Notification
 *
 * @param  {String} message
 */
export const displayInfo = (message, timeout = undefined) => dispatch =>
    dispatch(displayNotificationWithTimeout('info', message, timeout));
