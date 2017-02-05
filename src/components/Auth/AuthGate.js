import React from 'react';
import { connect } from 'react-redux';

import { setAuthRefreshTimeout } from 'app/actions/auth';
import {
    getAuthIsExpired, getAuthExpiresAt,
    getCurrentUserId, getCurrentUserIsAuthenticated,
} from 'app/common/selectors';
import Login from 'app/views/Login';

class AuthGate extends React.Component {
    componentDidMount() {
        console.log('AuthGate@componentDidMount()');
        this.setAuthRefreshTimeout();
    }

    setAuthRefreshTimeout() {
        console.log('AuthGate@setAuthRefreshTimeout()');
        if (!this.props.userIsAuthenticated) {
            return;
        }

        const now = new Date();
        const expiration = new Date(this.props.authExpiresAt);
        const expiresIn = (expiration.getTime() - now.getTime());

        this.props.onSetRefreshTimeout(expiresIn);
    }

    render() {
        const { authIsExpired, children, haveCurrentUser, userIsAuthenticated } = this.props;
        return (userIsAuthenticated && !authIsExpired && haveCurrentUser)
            ? children
            : <Login />;
    }
}

AuthGate.propTypes = {
    authIsExpired: React.PropTypes.bool,
    authExpiresAt: React.PropTypes.string,
    children: React.PropTypes.node,
    haveCurrentUser: React.PropTypes.bool,
    onSetRefreshTimeout: React.PropTypes.func,
    userIsAuthenticated: React.PropTypes.bool,
};

const mapStateToProps = state => ({
    authIsExpired: getAuthIsExpired(state),
    authExpiresAt: getAuthExpiresAt(state),
    haveCurrentUser: !!getCurrentUserId(state),
    userIsAuthenticated: getCurrentUserIsAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
    onSetRefreshTimeout: timeout => dispatch(setAuthRefreshTimeout(timeout)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthGate);
