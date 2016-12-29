import React from 'react';
import styled from 'styled-components';

import styleConstants from 'app/config/styles';

const NotificationBox = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    border-top: 2px solid ${props => styleConstants[`${props.level}Color`]};
    border-radius: 0.5rem;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.5);
    bottom: 1.5rem;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 1.375em;
    padding: 1em 2em;
    position: fixed;
    right: 1.5rem;
    z-index: 100;
`;

const Notification = props => (
    <NotificationBox
        level={props.notification.level}
        onClick={props.onClick}
    >
        {props.notification.message}
    </NotificationBox>
);

Notification.propTypes = {
    notification: React.PropTypes.shape({
        level: React.PropTypes.string,
        message: React.PropTypes.string,
    }),
    onClick: React.PropTypes.func,
};

export default Notification;
