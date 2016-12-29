import { getEnv } from 'app/config/app';

module.exports = {
    client: {
        id: getEnv('OAUTH_CLIENT_ID'),
        secret: getEnv('OAUTH_CLIENT_SECRET'),
    },
    auth: {
        tokenHost: getEnv('OAUTH_SERVER_URL'),
    },
    scopes: [
        'users.list',
        'applications.list',
    ],
};
