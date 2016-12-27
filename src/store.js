import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import * as rootReducers from './reducers';

const rootReducer = combineReducers({
    ...rootReducers,
});

if (typeof window === 'undefined') {
    global.window = {};
}

const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default (initialState) => {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        );
    }

    return store;
};
