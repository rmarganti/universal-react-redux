
import actionNames from 'app/action-names';
import { combine } from 'app/common/helpers';


export default (state = {}, action) => {
    switch (action.type) {
        case actionNames.SAY:
            return combine(state, {
                message: action.message,
            });


        default:
            return state;
    }
};
