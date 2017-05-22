import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Music from 'components/app/music/Music';
import icon from 'components/app/wechat/icon';
import ApiWrapper from '../reqwestWrapper';

class MusicWrapper extends Component {

    static propTypes = {
        reqwest: PropTypes.func.isRequired,
    }

    state = {
        musics: [],
    }

    componentWillMount() {
        const { reqwest } = this.props;
        reqwest({
            url: '/api/music/list',
            type: 'json',
        }).then(resp => {
            const { status, data } = resp;
            if (status === 0) {
                this.setState({ musics: data });
                for (const music of data) {
                    const img = new Image();
                    img.src = music.cover;
                }
            }
        });
    }

    render() {
        const { musics } = this.state;
        return (
            <Music {...this.props} musics={musics} />
        );
    }
}

export default ApiWrapper(MusicWrapper, {
    icon,
});
