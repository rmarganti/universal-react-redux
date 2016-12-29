import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from 'app/views/Root';
import configureStore from 'app/store';

import './globalStyles/base.global.css';

const store = configureStore(window.__PRELOADED_STATE__);
const rootElement = document.getElementById('app');

render(
    <AppContainer>
        <Root store={store} />
    </AppContainer>,
    rootElement
);

// allow hot reload. Will ignore Router refresh changed
if (module.hot) {
    module.hot.accept('./views/Root', () => {
        const NextRoot = require('./views/Root').default;

        render(
            <AppContainer>
                <NextRoot store={store} />
            </AppContainer>,
            rootElement
        );
    });
}
