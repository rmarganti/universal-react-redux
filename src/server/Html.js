import React from 'react';

import config from '../../config';

const getCssSrc = () => (
    (config.isProduction)
        ? '/styles.css'
        : null
);

const getJsSrc = () => {
    const host = config.isProduction ? '' : `http://${config.appHost}`;
    const port = config.isProduction ? '' : `:${+config.appPort + 1}`;
    const path = config.isProduction ? '' : '/static';
    const file = config.isProduction ? 'bundle.min.js' : 'bundle.js';

    return `${host}${port}${path}/${file}`;
};

const Html = ({ store, markup }) => (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Universal Predux</title>
            {
                getCssSrc() &&
                    <link
                        href={getCssSrc()} media="screen, projection"
                        rel="stylesheet" type="text/css" charSet="UTF-8"
                    />
            }
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />

            <script
                dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__=${JSON.stringify(store.getState())};` }}
                charSet="UTF-8"
            />
            <script src={getJsSrc()} charSet="UTF-8" />
        </body>
    </html>
);

Html.propTypes = {
    store: React.PropTypes.object,
    markup: React.PropTypes.string,
};

export default Html;
