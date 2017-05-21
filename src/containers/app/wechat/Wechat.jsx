import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wechat from 'components/app/wechat/Wechat';
import icon from 'components/app/wechat/icon';
import ApiWrapper from '../reqwestWrapper';

class WechatWrapper extends Component {

    static propTypes = {
        reqwest: PropTypes.func.isRequired,
    }

    sendMessage = ({
        message = '',
        chatid = '',
    }) => {
        const { reqwest } = this.props;

        if (!chatid) {
            throw new Error('chatid is required');
        }

        return reqwest({
            url: '/api/wechat/chat',
            method: 'post',
            data: {
                message,
                chatid,
            },
        });
    }

    render() {
        return (
            <Wechat
              {...this.props}
              sendMessage={this.sendMessage}
            />
        );
    }
}

export default ApiWrapper(WechatWrapper, {
    icon,
});
