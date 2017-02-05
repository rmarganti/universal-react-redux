import { stringify } from 'query-string';
import serialize from 'serialize-javascript';
import { create as createOauth2 } from 'simple-oauth2';

import { get } from 'app/common/network';
import oauth2Config from 'app/config/oauth2';

const oauth2 = createOauth2({ client: oauth2Config.client, auth: oauth2Config.auth });

/**
 * Handle Avenue or Client login request
 *
 * @param {Object} req   Express request object
 * @param {Object} res   Express response object
 */
export const login = (req, res) => (
   (typeof req.body.client_id === 'undefined')
        ? loginAvenue(req, res)
        : loginClient(req, res)
);

/**
 * Handle Avenue login via Password Grant
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
const loginAvenue = (req, res) => {
    const loginCredentials = { username: req.body.username, password: req.body.password };

    oauth2.ownerPassword.getToken(loginCredentials)
        .then((result) => {
            const accessToken = oauth2.accessToken.create(result);
            setSerializedTokenCookie(res, accessToken.token, req.secure);
            const { refresh_token, ...response } = accessToken.token; // eslint-disable-line no-unused-vars
            res.send(response);
        })
        .catch((error) => {
            res.clearCookie('auth');
            res.status(401).send(error.context);
        });
};

/**
 * TODO: Fetch redirect info for Client Auth Code flow
 *
 * @param {Object} req   Express request object
 * @param {Object} res   Express response object
 */
const loginClient = (req, res) => {
    const uri = `${oauth2Config.auth.tokenHost}${oauth2Config.auth.authorizePath}?${stringify(req.body)}`;

    get(
        uri,
        response => res.send(response),
        (error) => {
            res.status(error.response.status)
                .send(JSON.stringify(error.json));
        }
    );
};

/**
 * Refresh Token stored in a Cookie in
 * order to retrieve a new Access Token
 *
 * @param  {Object} req Express request object
 * @param  {Object} res Express response object
 */
export const refresh = (req, res) => {
    const token  = oauth2.accessToken.create(JSON.parse(req.cookies.auth));

    token.refresh()
        .then((result) => {
            setSerializedTokenCookie(res, result.token, req.secure);
            const { refresh_token, ...response } = result.token; // eslint-disable-line no-unused-vars
            res.send(response);
        })
        .catch((error) => {
            res.clearCookie('auth');
            res.status(401).send(error.context);
        });
};

/**
 * Save a cookie with Auth Token, etc.
 *
 * @param  {Object}  res    Express response object
 * @param  {Object}  token  Object w/access token, refresh token, etc
 * @param  {Boolean} secure Should this cookie be secure (if using HTTPS)
 */
export const setSerializedTokenCookie = (res, token, secure = false) =>
    res.cookie('auth', serialize(token, { isJSON: true }), {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure,
        httpOnly: true,
    });
