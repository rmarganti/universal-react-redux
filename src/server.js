import { Server } from 'http';
import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import config from '../config/config';
import routes from './routes';
import configureStore from './store';

const store = configureStore();

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '../dist')));

// universal routing and rendering
app.get('*', (req, res) => {
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

            // generate the React markup for the current route
            let markup;
            if (renderProps) {
                // if the current route matched we have renderProps
                markup = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
            } else {
                // otherwise we can render a 404 page
                markup = renderToString(<div>Not found</div>);
                res.status(404);
            }

            // render the index template with the embedded React markup
            return res.render('index', { markup });
        },
    );
});

server.listen(config.appPort, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info('==> ✅    App server listening on port %s', config.appPort);
});
