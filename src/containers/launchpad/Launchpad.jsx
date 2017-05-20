import { connect } from 'react-redux';
import Launchpad from '../../components/launchpad/Launchpad';
import { openApp } from '../../reducers/openedApps';
import { showLaunchpad, hideLaunchpad } from '../../reducers/launchpad';


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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launchpad);
