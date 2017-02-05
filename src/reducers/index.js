import { combineReducers } from 'redux';
import { reducer as entities } from 'giadc-redux-json-api';

import app from './app';
import auth from './auth';
import ui from './ui';

export default combineReducers({
    app,
    auth,
    entities,
    ui,
});
