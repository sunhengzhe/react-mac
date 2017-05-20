import { connect } from 'react-redux';
import { openApp } from '../../reducers/openedApps';
import { toggleLaunchpad, hideLaunchpad } from '../../reducers/launchpad';
import Dock from '../../components/dock/Dock';

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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dock);
