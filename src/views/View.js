import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { displayInfo } from 'app/actions/notification';

const Div = styled.div`
    text-align: center;
    font-size: 3em;
    padding-top: 2em;
`;

class View extends React.Component {
    componentDidMount() {
        this.props.displayInfo(this.props.params.id);
    }

    render() {
        const { message, params } = this.props;

        return (
            <Div>
                {message} <br />
                ParamId: {params.id}
            </Div>
        );
    }
}

View.propTypes = {
    displayInfo: React.PropTypes.func,
    message: PropTypes.string,
    params: PropTypes.object,
};

const mapStateToProps = state => ({
    message: state.app.message,
});

const mapDispatchToProps = dispatch => ({
    displayInfo: message => dispatch(displayInfo(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
