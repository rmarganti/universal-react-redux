import { Server } from 'http';
import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import config from '../config';
import routes from './routes';
import configureStore from './store';
import Html from './server/Html';

const app = new Express();
/**
 * Configure path for static assets
 */
app.use(Express.static(path.join(__dirname, '../static')));

/**
 * Configure universal routing and rendering
 */
app.get('*', (req, res) => {
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

            // generate the React markup for the current route
            const markup   = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
            const fullHtml = renderToString(<Html store={store} markup={markup} />);

            // Send the final response
            return res.send(`<!doctype html>\n${fullHtml}`);
        },
    );
});

/**
 * Start the server
 */
const server = new Server(app);
server.listen(config.appPort, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info('➡ ✅  App server listening on port %s', config.appPort);
});
