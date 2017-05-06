// actions
const INSTALL_APP = 'INSTALL_APP';
const UNINSTALL_APP = 'UNINSTALL_APP';

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case INSTALL_APP:
            if (state.includes(action.appid)) {
                return state;
            }

            return [
                ...state,
                action.appid,
            ];
        case UNINSTALL_APP:
            return [
                ...state.filter(appid => appid !== action.appid)
            ];
        default:
            return state;
    }
}

// action creators
export const installApp = (appid) => ({
    type: INSTALL_APP,
    appid,
});

export const uninstallApp = (appid) => ({
    type: UNINSTALL_APP,
    appid,
});
