import React, { Component } from 'react';
import reqwest from 'reqwest';
import Music from '../../../components/app/music/Music';

class MusicWrapper extends Component {

    state = {
        musics: [],
    }

    componentWillMount() {
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

export default MusicWrapper;
