import { connect } from 'react-redux';

import Launchpad from '../../../components/app/launchpad/Launchpad';

const mapStateToProps = (state) => {
    return {
        apps: state.allApps,
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
        closeApp: (appid) => {
            dispatch({
                type: 'CLOSE_APP',
                appid,
            });
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Launchpad);
