import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import styleSheet from 'styled-components/lib/models/StyleSheet';

import routes from 'app/routes';
import Html from 'app/server/components/Html';
import configureStore from 'app/store';

export default (req, res) => {
    const store  = configureStore();

    // Match the request URL to our configured routes
    match(
        { routes: routes(store), location: req.url },
        (err, redirectLocation, renderProps) => {
            // in case of error display the error message
            if (err) {
                return res.status(500).send(err.message);
            }

            // in case of redirect propagate the redirect to the browser
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            // If no routes match, send a 404. This should
            // never happen, as there is a catch-all route
            if (!renderProps) {
                res.status(404);
                return res.send('Not found');
            }

            // Generate the React markup for the current route
            const markup   = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
            const styles   = styleSheet.rules().map(rule => rule.cssText).join('\n');
            const fullHtml = renderToString(<Html markup={markup} store={store} styles={styles} />);

            // Send the final response
            return res.send(`<!doctype html>\n${fullHtml}`);
        },
    );
};
