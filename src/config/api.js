/**
 * Example usage:
 *
 * import api from 'app/config/api';
 * const url = api.fetchExampleEntity('12345');
 */

import ApiUriBuilder from 'app/common/apiUriBuilder';
import { getConfig } from 'app/config/app';

const baseUri = (typeof window === 'undefined')
    ? `${getConfig('appHost')}:${getConfig('appPort')}`
    : `${window.location.protocol}//${window.location.host}`;

const apiUriBuilder = new ApiUriBuilder(`${baseUri}/api`);

export default {
    /**
     * Auth
     */
    logIn: `${baseUri}/auth/login`,
    logOut: apiUriBuilder.resolve('users/current/logout'),
    authorizeClient: `${baseUri}/oauth/authorize`,
    refreshAuth: `${baseUri}/auth/refresh`,

    fetchExampleEntity: entityId => apiUriBuilder.resolve(`entities/${entityId}`, {
        include: ['example', 'relationships'],
    }),
};
