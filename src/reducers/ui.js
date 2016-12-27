import { combineReducers } from 'redux';

import actionNames from 'app/action-names';

/**
 * The reducer for the Loading indicator
 *
 * @param  {Number} state
 * @param  {Object} action
 * @return {Number}
 */
const loading = (state = 0, action) => {
    switch (action.type) {
        case actionNames.START_LOADING:
            return state + 1;

        case actionNames.STOP_LOADING:
            return state > 0 ? state - 1 : state;

        default:
            return state;
    }
};

const initialNotificationState = {
    level: null,
    message: null,
};

/**
 * The reducer for notificaitons
 *
 * @param  {Object} state
 * @param  {Object} action
 * @return {Object}
 */
const notification = (state = initialNotificationState, action) => {
    switch (action.type) {
        case actionNames.DISPLAY_NOTIFICATION:
            return {
                level: action.level,
                message: action.message,
            };

        case actionNames.CLEAR_NOTIFICATION:
            return initialNotificationState;

        default:
            return state;
    }
};

export default combineReducers({
    loading,
    notification,
});
