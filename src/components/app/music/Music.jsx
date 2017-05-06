import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapApp from '../wrapApp';
import './music.css';
import manifest from './manifest';

class Music extends Component {

    static propTypes = {
        DraggableArea: PropTypes.func,
        closeApp: PropTypes.func,
    }

    state = {
        title: 'We Don\'t Talk Anymore',
        subTitle: 'Someone',
    }

    render() {
        const { DraggableArea, closeApp } = this.props;
        const { title, subTitle } = this.state;

        return (
            <DraggableArea>
                <div className="music">
                    <div className="cover">
                        <div className="intro">
                            <a
                                className="close-btn"
                                onClick={() => {
                                    closeApp(manifest.appid);
                                }}
                            ></a>
                            <h3 className="title">{ title }</h3>
                            <p className="sub-title">{ subTitle }</p>
                        </div>
                        <div className="control">

                        </div>
                    </div>
                    <div className="play-list"></div>
                </div>
            </DraggableArea>
        );
    }
}

export default wrapApp(Music);
