// actions
const SHOW = 'SHOW_LAUNCHPAD';
const HIDE = 'HIDE_LAUNCHPAD';
const TOGGLE = 'TOGGLE_LAUNCHPAD';

// reducer
export default function launchpad(state = {}, action) {
    switch (action.type) {
        case SHOW:
            return {
                ...state,
                show: true,
            };
        case HIDE:
            return {
                ...state,
                show: false,
            };
        case TOGGLE:
            return {
                ...state,
                show: !state.show,
            };
        default:
            return state;
    }
}

// action creators
export const showLaunchpad = () => ({
    type: SHOW,
});

export const hideLaunchpad = () => ({
    type: HIDE,
});

export const toggleLaunchpad = () => ({
    type: TOGGLE,
});
