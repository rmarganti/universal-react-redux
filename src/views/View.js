import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const View = ({ message, params }) => (
    <div className="tc pv5 f1">
        {message} <br />
        ParamId:{params.id}
    </div>
);

View.propTypes = {
    message: PropTypes.string,
    params: PropTypes.object,
};

const mapStateToProps = state => ({
    message: state.app.message,
});

export default connect(mapStateToProps)(View);
