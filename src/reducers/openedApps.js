// actions
const OPEN_APP = 'OPEN_APP';
const CLOSE_APP = 'CLOSE_APP';

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case OPEN_APP:
            if (state.includes(action.appid)) {
                return state;
            }

            return [
                ...state,
                action.appid,
            ];
        case CLOSE_APP:
            return [
                ...state.filter(appid => appid !== action.appid)
            ];
        default:
            return state;
    }
};

// action creators
export const openApp = (appid) => ({
    type: OPEN_APP,
    appid,
});

export const closeApp = (appid) => ({
    type: CLOSE_APP,
    appid,
});
