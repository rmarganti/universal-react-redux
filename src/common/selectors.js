/**
 * Determine if the app is currently in a loading state
 *
 * @param  {Object} state
 * @return {Bool}
 */
export const getLoadingStatus = state => state.ui.loading > 0;

/**
 * Return the current notification state
 *
 * @param  {Object} state
 * @return {Object}
 */
export const getNotificationState = state => state.ui.notification;
