import React from 'react';

const OAuth2 = ({ token }) => (
    <html lang="en">
        <head>
            <title>Authorization</title>
        </head>

        <body>
            <div>OAuth2: {JSON.stringify(token)}</div>
        </body>
    </html>
);

OAuth2.propTypes = {
    token: React.PropTypes.object,
};

export default OAuth2;
