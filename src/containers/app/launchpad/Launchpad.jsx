import { connect } from 'react-redux';
import { openApp, closeApp } from '../../../reducers/openedApps';
import Launchpad from '../../../components/app/launchpad/Launchpad';

const mapStateToProps = (state) => {
    return {
        apps: state.allApps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openApp: (appid) => {
            dispatch(openApp(appid));
        },
        closeApp: (appid) => {
            dispatch(closeApp(appid));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launchpad);
