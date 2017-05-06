import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapApp from '../wrapApp';
import './music.css';

class Music extends Component {

    static propTypes = {
        DraggableArea: PropTypes.func,
    }

    render() {
        const { DraggableArea } = this.props
        return (
            <DraggableArea>
                <div className="music">
                    <div className="cover">
                        <div className="intro"></div>
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
