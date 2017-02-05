import httpProxy from 'http-proxy';

import config from 'app/config/app';

export default (app) => {
    const apiTargetUrl = `${config.apiHost}:${config.apiPort}`;

    const proxy = httpProxy.createProxyServer({
        changeOrigin: true,
    });

    proxy.on('error', err => console.log('Proxy error', err));

    /**
     * Add AuthToken to proxied requests
     */
    proxy.on('proxyReq', (proxyReq, req) => {
        if (!req.cookies.auth) { return; }
        const token = JSON.parse(req.cookies.auth).access_token;
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
    });

    /**
     * Proxy Requests to the API server
     */
    const proxyBases = ['images', 'api', 'oauth'];
    proxyBases.forEach(proxyBase =>
        app.use(`/${proxyBase}`, (req, res) => proxy.web(req, res, { target: `${apiTargetUrl}/${proxyBase}` }))
    );
};
