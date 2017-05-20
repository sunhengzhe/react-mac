import { connect } from 'react-redux';
import Desktop from '../../components/desktop/Desktop';
import { openApp } from '../../reducers/openedApps';
import { addNotification, clearNotification } from '../../reducers/notifications';
import { addScreen, goPrevScreen, goNextScreen } from '../../reducers/screens';

const mapStateToProps = (state) => ({
    openedApps: state.openedApps,
    screens: state.screens,
});

const mapDispatchToProps = (dispatch) => ({
    addNotification: (...args) => {
        dispatch(clearNotification());
        dispatch(addNotification(...args));
    },
    addScreen: (appid) => {
        dispatch(addScreen(appid));
    },
    goPrevScreen: () => {
        dispatch(goPrevScreen());
    },
    goNextScreen: () => {
        dispatch(goNextScreen());
    },
    openApp: (appid) => {
        dispatch(openApp(appid));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Desktop);
