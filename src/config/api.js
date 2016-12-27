/**
 * Example usage:
 *
 * import api from 'app/config/api';
 * const url = api.fetchExampleEntity('12345');
 */

import ApiUriBuilder from 'app/common/apiUriBuilder';

const apiUriBuilder = new ApiUriBuilder();

export default {
    fetchExampleEntity: entityId => apiUriBuilder.resolve(`entities/${entityId}`, {
        include: ['example', 'relationships'],
    }),
};
