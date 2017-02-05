import actionNames from 'app/action-names';

const initialState = {
    loggedIn: false,
    expiresAt: null,
    expiresIn: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionNames.SET_AUTHENTICATED:
            return {
                loggedIn: true,
                expiresAt: action.expiresAt,
                expiresIn: action.expiresIn,
            };

        case actionNames.SET_DEAUTHENTICATED:
            return initialState;

        default:
            return state;
    }
};
