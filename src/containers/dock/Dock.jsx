import { connect } from 'react-redux';
import { openApp } from '../../reducers/openedApps';
import Dock from '../../components/dock/Dock';

const mapStateToProps = (state) => {
    return {
        apps: state.dockApps,
        openedApps: state.openedApps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openApp: (appid) => {
            dispatch(openApp(appid));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dock);
