import cookieParser from 'cookie-parser';
import Express from 'express';
import { Server } from 'http';
import path from 'path';
import bodyParser from 'body-parser';

import config from 'app/config/app';
import createProxyServer from 'app/server/createProxyServer';
import enableDevFeatures from 'app/server/enableDevFeatures';
import * as oauth2 from 'app/server/oauth2';
import serverSideRendering from 'app/server/serverSideRendering';

const app = new Express();

/**
 * Automatically parse cookies
 */
app.use(cookieParser());

/**
 * Enable hot-reload, etc
 */
if (!config.isProduction) {
    enableDevFeatures(app);
}

/**
 * Configure path for static assets
 */
app.use(Express.static(path.join(__dirname, '../static')));

/**
 * Create Proxy Server for API
 */
createProxyServer(app);

/**
 * Handle log-in and token refresh
 */
const jsonParser = bodyParser.json();
app.post('/auth/login', jsonParser, (req, res) => oauth2.login(req, res));
app.get('/auth/refresh', oauth2.refresh);

/**
 * Configure universal routing and rendering
 */
app.get('*', serverSideRendering);

/**
 * Start the server
 */
const server = new Server(app);
server.listen(config.appPort, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.info('➡ ✅  \x1b[32mApp server listening at %s:%s\x1b[0m', config.appHost, config.appPort);
});
