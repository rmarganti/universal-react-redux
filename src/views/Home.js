
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


const Home = ({ message }) => (
    <div className="tc pv5 f1">
        {message || '^_^'}
    </div>
);


Home.propTypes = {
    message: PropTypes.string,
};


const mapStateToProps = (state) => ({
    message: state.app.message,
});


export default connect(mapStateToProps)(Home);
