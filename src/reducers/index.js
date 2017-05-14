import { combineReducers } from 'redux';
import openedApps from './openedApps';
import dockApps from './dockApps';
import allApps from './allApps';
import notifications from './notifications';

export default combineReducers({
    openedApps,
    dockApps,
    allApps,
    notifications,
});
