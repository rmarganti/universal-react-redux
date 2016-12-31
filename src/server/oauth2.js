import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { create as createOauth2 } from 'simple-oauth2';

import config from 'app/config/app';
import oauth2Config from 'app/config/oauth2';
import OAuth2 from 'app/server/components/OAuth2';

/**
 * Get the URL of the Authorization server,
 * including necessary query params
 *
 * @return {String}
 */
export const getAuthorizationUri = () => {
    const oauth2   = createOauth2({ client: oauth2Config.client, auth: oauth2Config.auth });
    const callback = `${config.appHost}:${config.appPort}/oauth/request_token`;

    return oauth2.authorizationCode.authorizeURL({
        redirect_uri: callback,
        scope: oauth2Config.scopes.join(','),
        state: '<state>',
    });
};

/**
 * Request an Access Token given the
 * code in the request query params
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
export const requestAccessToken = (req, res) => {
    const oauth2      = createOauth2({ client: oauth2Config.client, auth: oauth2Config.auth });
    const tokenConfig = {
        code: req.query.code,
        redirect_uri: `${config.appHost}:${config.appPort}/oauth/request_token`,
    };

    oauth2.authorizationCode.getToken(tokenConfig)
        .then((result) => {
            const accessToken = oauth2.accessToken.create(result);
            const markup      = renderToString(<OAuth2 token={accessToken} />);

            console.log(accessToken.token);

            setSerializedTokenCookie(res, accessToken.token, req.secure);
            res.send(`<!doctype html>\n${markup}`);
        }).catch((error) => {
            console.log('Access Token Error:', error);
            res.send(error.message);
        });
};

/**
 * TODO:
 * Use the Refresh Token stored in a Cookie
 * in order to retrieve a new Access Token
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
export const refreshAccessToken = (req, res) => {
    const oauth2 = createOauth2({ client: oauth2Config.client, auth: oauth2Config.auth });
    const token  = oauth2.accessToken.create(JSON.parse(req.cookies.auth));

    token.refresh()
        .then((result) => {
            setSerializedTokenCookie(res, result.token, req.secure);
            res.send(result.token);
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send(error.context.error_description);
        });
};

/**
 * Save a cookie with Auth Token, etc.
 *
 * @param  {Object}  res    Express response object
 * @param  {Object}  token  Object w/access token, refresh token, etc
 * @param  {Boolean} secure Should this cookie be secure (if using HTTPS)
 */
const setSerializedTokenCookie = (res, token, secure = false) =>
    res.cookie('auth', serialize(token, { isJSON: true }), {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure,
        httpOnly: true,
        path: `${config.appHost}:${config.appPort}/oauth/refresh_token`,
    });
