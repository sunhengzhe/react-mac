import { connect } from 'react-redux';
import Dock from '../../components/dock/Dock';
import { openApp } from '../../reducers/openedApps';
import { toggleLaunchpad, hideLaunchpad } from '../../reducers/launchpad';
import { changeScreen } from '../../reducers/screens';

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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dock);
