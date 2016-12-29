import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Div = styled.div`
    text-align: center;
    font-size: 3em;
    padding-top: 2em;
`;

const Home = ({ message }) => <Div>{message || '^_^'}</Div>;

Home.propTypes = {
    message: PropTypes.string,
};

const mapStateToProps = state => ({
    message: state.app.message,
});

export default connect(mapStateToProps)(Home);
