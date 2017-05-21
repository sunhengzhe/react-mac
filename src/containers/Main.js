import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import Menu from 'components/menu/Menu';
import Desktop from 'containers/desktop/Desktop';
import Launchpad from 'containers/launchpad/Launchpad';
import Notification from 'components/lib/notification/Notification';
import { openApp } from 'reducers/openedApps';
import { addNotification, removeNotification as removeNotificationCreator, clearNotification } from 'reducers/notifications';

import Dock from './dock/Dock';
import { throttle } from '../utils';

class Main extends Component {

    static propTypes = {
        notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
        removeNotification: PropTypes.func.isRequired,
        launchpad: PropTypes.shape().isRequired,
        screens: PropTypes.shape().isRequired,
    }

    state = {
        showMenu: false,
        showDock: false,
    }

    componentDidMount() {
        let showMenu = false;
        let showDock = false;
        document.addEventListener('mousemove', throttle((e) => {
            const { screens } = this.props;
            const { clientX, clientY } = e;
            if (screens.curIndex > 0) {
                if (clientX < 80) {
                    showDock = true;
                } else if (clientY < 40) {
                    showMenu = true;
                } else {
                    showMenu = false;
                    showDock = false;
                }
                this.setState({ showDock, showMenu });
            }
        }, 500, 1000));
    }

    render() {
        const { screens, notifications, removeNotification, launchpad } = this.props;
        const { showMenu, showDock } = this.state;
        return (
            <div
              className={
                `App ${
                    screens.curIndex > 0 ? 'other-screen' : ''
                } ${
                    showMenu ? 'show-menu' : ''
                } ${
                    showDock ? 'show-dock' : ''
                }`
              }
            >
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
    }
}

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
