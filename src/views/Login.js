import React from 'react';
import { connect } from 'react-redux';

import { logIn } from 'app/actions/auth';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.logIn(this.username.value, this.password.value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input ref={ (input) => { this.username = input; } } type="text" />
                <input ref={ (input) => { this.password = input; } } type="password" />
                <button type="submit">Log In</button>
            </form>
        );
    }
}

Login.propTypes = {
    logIn: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    logIn: (username, password) => dispatch(logIn(username, password)),
});

export default connect(null, mapDispatchToProps)(Login);
