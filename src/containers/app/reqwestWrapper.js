import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reqwest from 'reqwest';
import { addNotification as addNotificationCreator, clearNotification } from 'reducers/notifications';

export default (
    WrappedComponent,
    options = {},
) => {
    class App extends Component {

        static propTypes = {
            addNotification: PropTypes.func.isRequired,
        }

        /**
         * 对请求做一次封装
         * @memberof App
         */
        reqwest = (...args) => new Promise((resolve) => {
            const { addNotification } = this.props;
            const { icon } = options;
            reqwest(...args).then(resp => {
                if (resp.status !== 0) {
                    addNotification({
                        icon,
                        title: '网络错误',
                        content: resp.errmsg,
                    });
                } else {
                    resolve(resp);
                }
            }).catch(() => {
                addNotification({
                    icon,
                    title: '网络瘫痪',
                    content: '我感觉是你的网络有问题',
                });
            });
        })

        render() {
            return (
                <WrappedComponent
                  {...this.props}
                  reqwest={this.reqwest}
                />
            );
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        addNotification: (...args) => {
            dispatch(clearNotification());
            dispatch(addNotificationCreator(...args));
        },
    });

    return connect(
        null,
        mapDispatchToProps,
    )(App);
};
