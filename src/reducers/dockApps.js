// actions
const ADD_APP_TO_DOCK = 'ADD_APP_TO_DOCK';
const REMOVE_APP_FROM_DOCK = 'REMOVE_APP_FROM_DOCK';

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case ADD_APP_TO_DOCK:
            return [
                ...state,
                action.appid,
            ];
        case REMOVE_APP_FROM_DOCK:
            return [
                ...state.filter(appid => appid !== action.appid)
            ];
        default:
            return state;
    }
};

// action creators
export const addAppToDock = (appid) => ({
    type: ADD_APP_TO_DOCK,
    appid,
});

export const removeAppFromDock = (appid) => ({
    type: REMOVE_APP_FROM_DOCK,
    appid,
});
