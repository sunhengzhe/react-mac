import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '../components/menu/Menu';
import Notification from '../components/lib/notification/Notification';
import Dock from './dock/Dock';
import { openApp, closeApp } from '../reducers/openedApps';
import { addNotification, removeNotification as removeNotificationCreator, clearNotification } from '../reducers/notifications';
import appstoreIcon from '../images/appstore.png';
import welcome from '../components/app/welcome/manifest';

class Main extends Component {

    static propTypes = {
        openedApps: PropTypes.arrayOf(PropTypes.string).isRequired,
        notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
        openApp: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
        removeNotification: PropTypes.func.isRequired,
    }

    componentWillMount() {
        const hasCheckedUpdate = !!localStorage.getItem('checked-update-info');
        if (hasCheckedUpdate) {
            this.props.addNotification({
                icon: appstoreIcon,
                title: '新版本更新',
                content: '添加了若干新的功能，点击查看',
                onClick: () => {
                    this.props.openApp(welcome.appid);
                },
            });
        }
    }

    render() {
        const {
            openedApps,
            notifications,
            removeNotification,
        } = this.props;
        return (
            <div className="App">
                <Menu />
                <Dock />
                {
                    openedApps.map((appid) => {
                        const App = require(`../${appid}`).default;
                        return (
                            <App
                              key={appid}
                              {...this.props}
                            />
                        );
                    })
                }
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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    openedApps: state.openedApps,
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
    openApp: (appid) => {
        dispatch(openApp(appid));
    },
    closeApp: (appid) => {
        dispatch(closeApp(appid));
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
