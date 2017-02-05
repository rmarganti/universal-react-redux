import { getEnv } from 'app/common/helpers';

module.exports = {
    client: {
        id: getEnv('OAUTH_CLIENT_ID'),
        secret: getEnv('OAUTH_CLIENT_SECRET'),
    },
    auth: {
        tokenHost: getEnv('OAUTH_SERVER_URL'),
        tokenPath: '/oauth/access_token',
    },
    scopes: [],
};
