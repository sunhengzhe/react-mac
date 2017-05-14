import { connect } from 'react-redux';
import { openApp } from '../../reducers/openedApps';
import Dock from '../../components/dock/Dock';

const mapStateToProps = (state) => ({
    apps: state.dockApps,
    openedApps: state.openedApps,
});

const mapDispatchToProps = (dispatch) => ({
    openApp: (appid) => {
        dispatch(openApp(appid));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dock);
