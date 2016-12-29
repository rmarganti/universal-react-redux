import React from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
    from {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
`;

const LoadingIndicator = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 4px;
    overflow: hidden;

    &:before{
        display: block;
        position: absolute;
        content: "";
        left: -200px;
        width: 200px;
        height: 4px;
        background-color: rgba(200, 200, 200, 0.5);
        animation: ${animation} 2s linear infinite;
    }
`;

export default () => <LoadingIndicator />;
