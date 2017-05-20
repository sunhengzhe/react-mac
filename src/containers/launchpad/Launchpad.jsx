import { connect } from 'react-redux';
import Launchpad from '../../components/launchpad/Launchpad';
import { openApp } from '../../reducers/openedApps';
import { showLaunchpad, hideLaunchpad } from '../../reducers/launchpad';
import { changeScreen } from '../../reducers/screens';

const mapStateToProps = (state) => ({
    apps: state.allApps,
});

const mapDispatchToProps = (dispatch) => ({
    openApp: (appid) => {
        dispatch(openApp(appid));
    },
    showLaunchpad: () => {
        dispatch(showLaunchpad());
    },
    hideLaunchpad: () => {
        dispatch(hideLaunchpad());
    },
    changeScreen: (index) => {
        dispatch(changeScreen(index));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launchpad);
