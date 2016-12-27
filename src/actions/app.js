
import actionNames from 'app/action-names';


export const say = message => ({
    type: actionNames.SAY,
    message,
});

// chained action creator
export const greeting = () => (dispatch, getState) => {
    dispatch(say('Aloha'));
    setTimeout(() => dispatch(say('Goodbye now')), 3000);
};
