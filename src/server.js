import cookieParser from 'cookie-parser';
import { Server } from 'http';
import Express from 'express';
import path from 'path';

import config from 'app/config/app';
import * as oauth2 from 'app/server/oauth2';
import serverSideRendering from 'app/server/serverSideRendering';

const app = new Express();

/**
 * Automatically parse cookies
 */
app.use(cookieParser());

/**
 * Configure path for static assets
 */
app.use(Express.static(path.join(__dirname, '../static')));

/**
 * Redirect to the Authorization server
 */
app.get('/oauth/authorize', (req, res) => {
    const authorizationUri = oauth2.getAuthorizationUri();
    res.redirect(authorizationUri);
});

/**
 * Request an authentication token
 */
app.get('/oauth/request_token', (req, res) => oauth2.requestAccessToken(req, res));

/**
 * Refresh authentication using
 * refresh token stored as a cookie
 */
app.get('/oauth/refresh_token', (req, res) => oauth2.refreshAccessToken(req, res));

/**
 * Configure universal routing and rendering
 */
app.get('*', (req, res) => serverSideRendering(req, res));

/**
 * Start the server
 */
const server = new Server(app);
server.listen(config.appPort, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info('➡ ✅  \x1b[32mApp server listening at %s:%s', config.appHost, config.appPort);
});
