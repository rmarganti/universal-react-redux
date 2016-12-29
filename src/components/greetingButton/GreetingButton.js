import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import styled from 'styled-components';

import styleConstants from 'app/config/styles';
import { greeting } from 'app/actions';

const Button = styled.button`
    background-color: ${styleConstants.primaryColor};
    border: 0;
    color: ${styleConstants.backgroundColor};
    outline: none;
    padding: 1em 2em;
    text-align: center;
    transition: background-color .3s ease-in-out;

    &:hover {
        background-color: ${styleConstants.primaryColorDark};
    }
`;

const GreetingButton = ({ sayGreeting }) => (
    <Button onClick={sayGreeting}>
        Greeting
    </Button>
);

GreetingButton.propTypes = {
    sayGreeting: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    sayGreeting: () => dispatch(greeting()),
});

export default connect(null, mapDispatchToProps)(GreetingButton);
