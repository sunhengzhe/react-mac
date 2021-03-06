import { combineReducers } from 'redux';
import openedApps from './openedApps';
import dockApps from './dockApps';
import allApps from './allApps';
import notifications from './notifications';
import launchpad from './launchpad';
import screens from './screens';
import topApp from './topApp';

export default combineReducers({
    openedApps,
    dockApps,
    allApps,
    notifications,
    launchpad,
    screens,
    topApp,
});
