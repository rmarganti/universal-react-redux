import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import promiseMiddleware from 'app/common/promiseMiddleware';
import rootReducer from 'app/reducers';

if (typeof window === 'undefined') {
    global.window = {};
}

const enhancer = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware),
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
