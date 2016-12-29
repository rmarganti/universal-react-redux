import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';

import { clearNotification } from 'app/actions';
import Notification from 'app/components/Notification/Notification';
import GreetingButton from 'app/components/GreetingButton/GreetingButton';
import { getLoadingStatus, getNotificationState } from 'app/common/selectors';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';

const Container = styled.div`
    padding: 5em;
    text-align: center;
`;

const Children = styled.div`
    color: gray;
    padding-bottom: 6em;
    padding-top: 6em;
`;

const StyledLink = styled(Link)`
    padding: 3em;
`;

const Master = ({ children, isLoading, notification, onClearNotification }) => (
    <Container>
        <GreetingButton />
        <Children>{children}</Children>

        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/view/12345">Route to view</StyledLink>

        { (isLoading > 0) && <LoadingIndicator /> }
        { (notification.level) && <Notification notification={notification} onClick={onClearNotification} /> }
    </Container>
);

Master.propTypes = {
    children: PropTypes.element,
    isLoading: React.PropTypes.bool,
    notification: React.PropTypes.object,
    onClearNotification: React.PropTypes.func,
};

const mapStateToProps = state => ({
    isLoading: getLoadingStatus(state),
    notification: getNotificationState(state),
});

const mapDispatchToProps = dispatch => ({
    onClearNotification: () => dispatch(clearNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Master);
