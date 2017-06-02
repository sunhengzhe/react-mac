import { connect } from 'react-redux';
import Dock from '../../components/dock/Dock';
import { openApp } from '../../reducers/openedApps';
import { toggleLaunchpad, hideLaunchpad } from '../../reducers/launchpad';
import { changeScreen } from '../../reducers/screens';
import { changeTopApp } from '../../reducers/topApp';

const mapStateToProps = (state) => ({
    apps: state.dockApps,
    openedApps: state.openedApps,
});

const mapDispatchToProps = (dispatch) => ({
    openApp: (appid) => {
        dispatch(openApp(appid));
    },
    hideLaunchpad: () => {
        dispatch(hideLaunchpad());
    },
    toggleLaunchpad: () => {
        dispatch(toggleLaunchpad());
    },
    changeScreen: (index) => {
        dispatch(changeScreen(index));
    },
    changeTopApp: (appid) => {
        dispatch(changeTopApp(appid));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dock);
