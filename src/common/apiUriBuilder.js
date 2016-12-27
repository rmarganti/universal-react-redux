/*
USAGE EXAMPLES:

// If no base URI is provided, it will default
// to the current host followed by '/api'.
const apiUriBuilder = new ApiUriBuilder('http://example.com/api');

const url = apiUriBuilder.resolve('creatives', {
    size: '250x200',
    runDate: { from: '01/01/2001', to: '10/10/2020' },
    sort: 'adNumber',
    pagination: { number: 1, size: 20 },
});

*/

class ApiUriBuilder {
    constructor(baseUri = null) {
        this.baseUri = baseUri || `${window.location.protocol}//${window.location.host}/api`;
    }

    /**
     * Build a URL with the given filter & pagination params
     *
     * @param  {String} path
     * @param  {Object} params
     * @return {String}
     */
    resolve(path, params) {
        return `${this.baseUri}/${path}${this._processParams(params)}`;
    }

    /**
     * Process the Filter & Pagination params
     *
     * @param  {Object} params
     * @return {String}
     */
    _processParams(params) {
        if (!params) {
            return '';
        }

        return `?${
            Object.keys(params)
                .filter(paramName => params[paramName] || params[paramName] === 0)
                .map(paramName => {
                    if (paramName === 'pagination') { return this._processPagination(params[paramName]); }
                    if (paramName === 'include') { return this._processIncludes(params[paramName]); }
                    if (paramName === 'sort') { return `sort=${params.sort}`; }
                    return this._processFilter(paramName, params[paramName]);
                }).join('&')
        }`;
    }

    /**
     * Process Pagination
     *
     * @param  {Object} pagination
     * @return {String}
     */
    _processPagination(pagination) {
        if (!pagination.number && !pagination.size) {
            return '';
        }

        return Object.keys(pagination)
            .filter(key => (['number', 'size'].indexOf(key) > -1))
            .filter(key => !!(pagination[key]))
            .map(key => `page[${key}]=${pagination[key]}`)
            .join('&');
    }

    _processIncludes(includes) {
        return `include=${includes.join(',')}`;
    }

    /**
     * Process a single Filter
     *
     * @param  {String}        filterName
     * @param  {String|Object} filterValue
     * @return {String}
     */
    _processFilter(filterName, filterValue) {
        if (filterValue.from && filterValue.to) {
            return `filter[${filterName}]=${this._processDateFilterValue(filterValue)}`;
        }

        return `filter[${filterName}]=${encodeURIComponent(filterValue)}`;
    }

    /**
     * Process a date Filter
     *
     * @param  {Object} filterValue
     * @return {String}
     */
    _processDateFilterValue(filterValue) {
        return `${filterValue.from}-${filterValue.to}`;
    }

}

export default ApiUriBuilder;
