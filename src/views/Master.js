import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { clearNotification } from 'app/actions';
import Notification from 'app/components/Notification/Notification';
import GreetingButton from 'app/components/GreetingButton/GreetingButton';
import { getLoadingStatus, getNotificationState } from 'app/common/selectors';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';

const Master = ({ children, isLoading, notification, onClearNotification }) => (
    <div className="pa5 tc">
        <GreetingButton />

        <div className="cf pv6 gray">{children}</div>

        <Link to="/" className="pa3">Home</Link>
        <Link to="/view/12345" className="pa3">Route to view</Link>

        { (isLoading > 0) && <LoadingIndicator /> }
        { (notification.level) && <Notification notification={notification} onClick={onClearNotification} /> }
    </div>
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
