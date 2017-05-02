import { combineReducers } from 'redux'

const openedApps = (state = [], action) => {
    switch (action.type) {
        case 'OPEN_APP':
            if (state.includes(action.appid)) {
                return state;
            }
            return [
                ...state,
                action.appid,
            ];
        case 'CLOSE_APP':
            return [
                ...state.filter(appid => appid !== action.appid)
            ];
        default:
            return state;
    }
};

const dockApps = (state = [], action) => {
    switch (action.type) {
        case 'ADD_APP_TO_DOCK':
            return [
                ...state,
                action.appid,
            ];
        case 'REMOVE_APP_FROM_DOCK':
            return [
                ...state.filter(appid => appid !== action.appid)
            ];
        default:
            return state;
    }
}

export default combineReducers({ openedApps, dockApps });