// actions
const ADD_SCREEN = 'ADD_SCREEN';
const REMOVE_SCREEN = 'REMOVE_SCREEN';
const GO_PREV_SCREEN = 'GO_PREV_SCREEN';
const GO_NEXT_SCREEN = 'GO_NEXT_SCREEN';
const CHANGE_SCREEN = 'CHANGE_SCREEN';

// reducer
export default function screens(state = {
    curIndex: 0,
    apps: [],
}, action) {
    switch (action.type) {
        case ADD_SCREEN:
            return {
                ...state,
                curIndex: state.curIndex + 1,
                apps: [
                    ...state.apps,
                    action.appid,
                ],
            };
        case REMOVE_SCREEN:
            return {
                ...state,
                apps: [
                    ...state.apps.filter(appid => appid !== action.appid),
                ],
            };
        case GO_PREV_SCREEN:
            return {
                ...state,
                curIndex: state.curIndex > 0 ? state.curIndex - 1 : 0,
            };
        case GO_NEXT_SCREEN:
            return {
                ...state,
                curIndex: state.curIndex < state.apps.length ? state.curIndex + 1 : state.apps.length,
            };
        case CHANGE_SCREEN:
            return {
                ...state,
                curIndex: action.index,
            };
        default:
            return state;
    }
}

// action creators
export const addScreen = (appid) => ({
    type: ADD_SCREEN,
    appid,
});

export const removeScreen = (appid) => ({
    type: REMOVE_SCREEN,
    appid,
});

export const goPrevScreen = () => ({
    type: GO_PREV_SCREEN,
});

export const goNextScreen = () => ({
    type: GO_NEXT_SCREEN,
});

export const changeScreen = (index) => ({
    type: CHANGE_SCREEN,
    index,
});
