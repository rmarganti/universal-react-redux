import React from 'react';
import styled from 'styled-components';

import config from 'app/config/app';
import styleConstants from 'app/config/styles';

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

const Body = styled.body`
    color: ${styleConstants.textColor};
    background-color: ${styleConstants.backgroundColor};
`;

const Html = ({ markup, store, styles }) => (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>{ styles }</style>
            <title>Universal Predux</title>
            {
                getCssSrc() &&
                    <link
                        href={getCssSrc()} media="screen, projection"
                        rel="stylesheet" type="text/css" charSet="UTF-8"
                    />
            }
        </head>
        <Body>
            <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />

            <script
                dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__=${JSON.stringify(store.getState())};` }}
                charSet="UTF-8"
            />
            <script src={getJsSrc()} charSet="UTF-8" />
        </Body>
    </html>
);

Html.propTypes = {
    markup: React.PropTypes.string,
    store: React.PropTypes.object,
    styles: React.PropTypes.string,
};

export default Html;
