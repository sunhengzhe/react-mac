import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapApp from '../wrapApp';
import './music.css';
import manifest from './manifest';
import MUSIC_LIST from './data';
import icon from './icon.png';

const PROGRESS_WIDTH = 248.86;

class Music extends Component {

    static propTypes = {
        DraggableArea: PropTypes.func.isRequired,
        closeApp: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
    }

    state = {
        title: '',
        index: 0,
        isPlay: false,
        currentTime: 0,
    }

    constructor(...args) {
        super(...args);
        this.seeking = false;
    }

    componentDidMount() {
        // 添加播放结束事件
        this.audio.addEventListener('ended', this.nextSong);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.leaveTimeout);
    }

    /**
     * 移入面板
     * @memberof Music
     */
    onMouseEnterCover = () => {
        clearTimeout(this.leaveTimeout);
        this.introPanel.style.opacity = 1;
        this.controlPanel.style.opacity = 1;
    }

    /**
     * 移出面板
     * @memberof Music
     */
    onMouseLeaveCover = () => {
        this.leaveTimeout = setTimeout(() => {
            this.introPanel.style.opacity = 0;
            this.controlPanel.style.opacity = 0;
        }, 500);
    }

    play = () => {
        clearInterval(this.interval);
        this.audio.play();
        this.interval = setInterval(() => {
            if (!this.seeking) {
                // 没有在拖动进度条的时候更新进度条
                this.setState({ currentTime: this.audio.currentTime });
            }
        }, 1000);
        this.setState({ isPlay: true });
    }

    pause = () => {
        clearInterval(this.interval);
        this.audio.pause();
        this.setState({ isPlay: false });
    }

    nextSong = () => {
        let { index } = this.state;
        if (++index === MUSIC_LIST.length) {
            // 已经是最后一首
            index = 0;
        }
        this.setState({
            index,
            currentTime: 0,
        }, () => {
            this.play();
        });
        // 发送通知
        const { title, album, author } = MUSIC_LIST[index];
        this.props.addNotification({
            icon,
            title,
            content: `${author} -- ${album}`,
        });
    }

    prevSong = () => {
        let { index } = this.state;
        if (--index === -1) {
            // 已经是第一首
            index = MUSIC_LIST.length - 1;
        }
        this.setState({
            index,
            currentTime: 0,
        }, () => {
            this.audio.play();
        });
        // 发送通知
        const { title, album, author } = MUSIC_LIST[index];
        this.props.addNotification({
            icon,
            title,
            content: `${author} -- ${album}`,
        });
    }

    /**
     * 开始拖动进度条
     * @memberof Music
     */
    startSeek = (e) => {
        this.seeking = true;
        const { clientX } = e;
        this.lastX = clientX;
        this.startBarWidth = +this.progressBar.style.width.replace('%', '');
    }

    /**
     * 拖动进度条
     * @memberof Music
     */
    changeProgress = (e) => {
        if (this.seeking) {
            e.stopPropagation();
            const { clientX } = e;
            const changeX = clientX - this.lastX;
            const changeRate = changeX / PROGRESS_WIDTH * 100;
            let barWidth = this.startBarWidth + changeRate;

            if (barWidth < 0 ) {
                barWidth = 0;
            }

            if (barWidth > 100) {
                barWidth = 100;
            }

            this.seekTime = barWidth / 100 * this.audio.duration;
            this.progressBar.style.width = `${barWidth}%`;
            this.progressBtn.style.left = `${barWidth}%`;
        }
    }

    /**
     * 拖动进度条结束
     * @memberof Music
     */
    seekToTime = (e) => {
        if (this.seeking) {
            this.audio.currentTime = this.seekTime;
            this.setState({
                currentTime: this.seekTime,
            });
            this.seeking = false;
        }
    }

    /**
     * 播放事件
     * @memberof Music
     */
    handlePlay = () => {
        if (this.state.isPlay) {
            this.pause();
        } else {
            this.play();
        }
    }

    render() {
        const { DraggableArea, closeApp } = this.props;
        const { index, isPlay, currentTime } = this.state;
        const { title, album = '未知', author = '未知', src, cover = icon } = MUSIC_LIST[index];
        const curPos = this.audio ? currentTime / this.audio.duration * 100 : 0;

        return (
            <DraggableArea>
                <div
                    onMouseMove={this.changeProgress}
                    onMouseUp={this.seekToTime}
                    onMouseLeave={this.seekToTime}
                >
                    <audio ref={node => this.audio = node} src={src} />
                    <div className="music">
                        <div
                            className="big-cover"
                            style={{
                                backgroundImage: `url(${cover})`
                            }}
                            onMouseLeave={this.onMouseLeaveCover}
                            onMouseEnter={this.onMouseEnterCover}
                        >
                            <div
                                className="intro-panel"
                                ref={node => {this.introPanel = node}}
                            >
                                <a
                                    className="close-btn"
                                    onClick={() => {
                                        closeApp(manifest.appid);
                                    }}
                                ></a>
                                <h3 className="title">{ title }</h3>
                                <p className="sub-title">{ `${author} -- ${album}` }</p>
                            </div>
                            <div
                                className="control-panel"
                                ref={node => {this.controlPanel = node}}
                            >
                                <div className="left-wrap pull-left">
                                    <i
                                        className="small-cover"
                                        style={{
                                            backgroundImage: `url(${cover})`
                                        }}
                                    ></i>
                                </div>
                                <div className="right-wrap pull-left">
                                    <div className="top-wrap">
                                        <div className="btn-wrap pull-left">
                                            <div className="prev-btn-wrap pull-left">
                                                <a
                                                    className="prev-btn-icon"
                                                    onClick={this.prevSong}
                                                ></a>
                                            </div>
                                            <div className="play-btn-wrap pull-left">
                                                <a
                                                    className={
                                                        `play-btn-icon ${isPlay ? 'pause' : ''}`
                                                    }
                                                    onClick={this.handlePlay}
                                                ></a>
                                            </div>
                                            <div className="next-btn-wrap pull-left">
                                                <a
                                                    className="next-btn-icon"
                                                    onClick={this.nextSong}
                                                ></a>
                                            </div>
                                        </div>
                                        <div className="tools-wrap pull-left">
                                            <a className="like-btn">
                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                            </a>
                                            <a className="lyric-btn">
                                                <i className="lyric-icon"></i>
                                            </a>
                                            <a className="voice-btn">
                                                <i className="fa fa-volume-up" aria-hidden="true"></i>
                                            </a>
                                            <a className="list-btn">
                                                <i className="fa fa-list-ul" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="progress-wrap">
                                        <div className="progress-bar">
                                            <div
                                                className="played-progress"
                                                ref={node => this.progressBar = node}
                                                style={{
                                                    width: `${curPos}%`
                                                }}
                                            ></div>
                                            <i className="progress-btn"
                                                ref={node => this.progressBtn = node}
                                                style={{
                                                    left: `${curPos}%`
                                                }}
                                                onMouseDown={this.startSeek}
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="play-list"></div>
                    </div>
                </div>
            </DraggableArea>
        );
    }
}

export default wrapApp(Music);
