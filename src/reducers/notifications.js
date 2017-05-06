// actions
const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

// reducer
export default function notifications(state = [], action) {
    switch(action.type) {
        case ADD_NOTIFICATION:
            return [
                ...state,
                {
                    id: action.id,
                    icon: action.icon,
                    title: action.title,
                    content: action.content,
                    onClick: action.onClick,
                }
            ];
        case REMOVE_NOTIFICATION:
            return state.filter(item => {
                return item.id !== action.id;
            });
        case CLEAR_NOTIFICATION:
            return [];
        default:
            return state;
    }
}

// action creators
export const addNotification = ({
    id = +new Date(),
    ...args,
}) => ({
    type: ADD_NOTIFICATION,
    id,
    ...args,
});

export const removeNotification = (id) => ({
    type: REMOVE_NOTIFICATION,
    id,
});

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION,
});
