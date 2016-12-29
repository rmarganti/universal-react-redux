import React from 'react';

const OAuth2 = ({ code }) => (
    <html lang="en">
        <head>
            <title>Authorization</title>
        </head>

        <body>
            <div>OAuth2: {code}</div>
        </body>
    </html>
);

OAuth2.propTypes = {
    code: React.PropTypes.string,
};

export default OAuth2;
