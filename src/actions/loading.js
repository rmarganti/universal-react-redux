import actionNames from 'app/action-names';

/**
 * Show the Loading indicator
 *
 * @return {Object}
 */
export const startLoading = () => ({
    type: actionNames.START_LOADING,
});

/**
 * Hide the Loading indicator
 *
 * @return {Object}
 */
export const stopLoading = () => ({
    type: actionNames.STOP_LOADING,
});
