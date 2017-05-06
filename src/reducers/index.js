import { combineReducers } from 'redux';
import openedApps from './openedApps';
import dockApps from './dockApps';
import allApps from './allApps';

export default combineReducers({ openedApps, dockApps, allApps });