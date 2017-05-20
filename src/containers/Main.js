import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import Menu from '../components/menu/Menu';
import Desktop from '../containers/desktop/Desktop';
import Launchpad from '../containers/launchpad/Launchpad';
import Notification from '../components/lib/notification/Notification';
import Dock from './dock/Dock';
import { openApp } from '../reducers/openedApps';
import { addNotification, removeNotification as removeNotificationCreator, clearNotification } from '../reducers/notifications';

const Main = ({
    notifications,
    removeNotification,
    launchpad,
    screens,
}) => (
    <div className={`App ${screens.curIndex > 0 ? 'other-screen' : ''}`}>
        <CSSTransitionGroup
          transitionName="component"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
            <Menu />
            <Dock />
            <Desktop />
            {
                notifications.map((nProps) => (
                    <Notification
                      key={nProps.id}
                      destroy={() => {
                          removeNotification(nProps.id);
                      }}
                      {...nProps}
                    />
                ))
            }
            {
                launchpad.show ? (
                    <Launchpad />
                ) : ''
            }
        </CSSTransitionGroup>
    </div>
);

Main.propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeNotification: PropTypes.func.isRequired,
    launchpad: PropTypes.shape().isRequired,
    screens: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
    openedApps: state.openedApps,
    notifications: state.notifications,
    launchpad: state.launchpad,
    screens: state.screens,
});

const mapDispatchToProps = (dispatch) => ({
    openApp: (appid) => {
        dispatch(openApp(appid));
    },
    addNotification: (...args) => {
        dispatch(clearNotification());
        dispatch(addNotification(...args));
    },
    removeNotification: (id) => {
        dispatch(removeNotificationCreator(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
