import React from 'react';

import styles from './Notification.scss';

const Notification = props => (
    <div
        className={`${styles.notification} ${styles[props.notification.level]}`}
        onClick={props.onClick}
    >

        {props.notification.message}

    </div>
);

Notification.propTypes = {
    notification: React.PropTypes.shape({
        level: React.PropTypes.string,
        message: React.PropTypes.string,
    }),
    onClick: React.PropTypes.func,
};

export default Notification;
