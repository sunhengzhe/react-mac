import { connect } from 'react-redux'

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
            dispatch({
                type: 'OPEN_APP',
                appid,
            });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dock)