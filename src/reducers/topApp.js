// actions
const CHANGE_TOP_APP = 'CHANGE_TOP_APP';

// reducer
export default function screens(state = '', action) {
    switch (action.type) {
        case CHANGE_TOP_APP:
            return action.appid;
        default:
            return state;
    }
}

// action creators
export const changeTopApp = (appid) => ({
    type: CHANGE_TOP_APP,
    appid,
});
