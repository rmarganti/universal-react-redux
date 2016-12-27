import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import { greeting } from 'app/actions';
import styles from './GreetingButton.scss';

const GreetingButton = ({ sayGreeting }) => (
    <div className={styles.greetingButton}>
        <button onClick={sayGreeting}>
            Greeting
        </button>
    </div>
);

GreetingButton.propTypes = {
    sayGreeting: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    sayGreeting: () => dispatch(greeting()),
});

export default connect(null, mapDispatchToProps)(GreetingButton);
