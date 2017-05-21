import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wrapApp from '../wrapApp';
import './music.css';
import manifest from './manifest';
import icon from './icon.png';
import defaultIcon from './default-music.png';

const PROGRESS_WIDTH = 248.86;

class Music extends Component {

    static propTypes = {
        musics: PropTypes.arrayOf(PropTypes.object).isRequired,
        DraggableArea: PropTypes.func.isRequired,
        closeApp: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
    }

    constructor(...args) {
        super(...args);
        this.seeking = false;
    }

    state = {
        title: '',
        index: 0,
        isPlay: false,
        currentTime: 0,
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
        const { musics } = this.props;
        if (++index === musics.length) {
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
        const { title, album, author } = musics[index];
        this.props.addNotification({
            icon,
            title,
            content: `${author} -- ${album}`,
        });
    }

    prevSong = () => {
        let { index } = this.state;
        const { musics } = this.props;
        if (--index === -1) {
            // 已经是第一首
            index = musics.length - 1;
        }
        this.setState({
            index,
            currentTime: 0,
        }, () => {
            this.audio.play();
        });
        // 发送通知
        const { title, album, author } = musics[index];
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

            if (barWidth < 0) {
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
    seekToTime = () => {
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
        if (!this.audio.src) {
            return;
        }

        if (this.state.isPlay) {
            this.pause();
        } else {
            this.play();
        }
    }

    handleLike = () => {
        this.props.addNotification({
            icon,
            title: '我也喜欢这首歌！',
            content: '喜欢就直接去网易云音乐上搜索吧！',
        });
    }

    toggleLyric = () => {
        this.props.addNotification({
            icon,
            title: '没有歌词喔',
            content: '很明显这是首纯音乐',
        });
    }

    handleVoice = () => {
        this.props.addNotification({
            icon,
            title: '是不是傻',
            content: '为什么不调你电脑的音量',
        });
    }

    togglePlayList = () => {
        this.props.addNotification({
            icon,
            title: '看不了播放列表！',
            content: '反正就这么几首歌你辛苦切一下吧...',
        });
    }

    render() {
        const { DraggableArea, closeApp, musics } = this.props;
        const { index, isPlay, currentTime } = this.state;
        const {
            title = '未知',
            album = '未知',
            author = '未知',
            src,
            cover = defaultIcon,
        } = musics[index] || {};
        const curPos = this.audio ? currentTime / this.audio.duration * 100 : 0;

        return (
            <DraggableArea>
                <div
                  onMouseMove={this.changeProgress}
                  onMouseUp={this.seekToTime}
                  onMouseLeave={this.seekToTime}
                >
                    <audio ref={node => (this.audio = node)} src={src} />
                    <div className="music">
                        <div
                          className="big-cover"
                          style={{
                              backgroundImage: `url(${cover})`,
                          }}
                          onMouseLeave={this.onMouseLeaveCover}
                          onMouseEnter={this.onMouseEnterCover}
                        >
                            <div
                              className="intro-panel"
                              ref={node => (this.introPanel = node)}
                            >
                                <a // eslint-disable-line
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
                              ref={node => (this.controlPanel = node)}
                            >
                                <div className="left-wrap pull-left">
                                    <i
                                      className="small-cover"
                                      style={{
                                          backgroundImage: `url(${cover})`,
                                      }}
                                    />
                                </div>
                                <div className="right-wrap pull-left">
                                    <div className="top-wrap">
                                        <div className="btn-wrap pull-left">
                                            <div className="prev-btn-wrap pull-left">
                                                <a //eslint-disable-line
                                                  className="prev-btn-icon"
                                                  onClick={this.prevSong}
                                                ></a>
                                            </div>
                                            <div className="play-btn-wrap pull-left">
                                                <a //eslint-disable-line
                                                  className={
                                                      `play-btn-icon ${isPlay ? 'pause' : ''}`
                                                  }
                                                  onClick={this.handlePlay}
                                                ></a>
                                            </div>
                                            <div className="next-btn-wrap pull-left">
                                                <a //eslint-disable-line
                                                  className="next-btn-icon"
                                                  onClick={this.nextSong}
                                                ></a>
                                            </div>
                                        </div>
                                        <div className="tools-wrap pull-left">
                                            <a // eslint-disable-line
                                              className="like-btn"
                                              onClick={this.handleLike}
                                            >
                                                <i className="fa fa-heart" aria-hidden="true" />
                                            </a>
                                            <a // eslint-disable-line
                                              className="lyric-btn"
                                              onClick={this.toggleLyric}
                                            >
                                                <i className="lyric-icon" />
                                            </a>
                                            <a // eslint-disable-line
                                              className="voice-btn"
                                              onClick={this.handleVoice}
                                            >
                                                <i className="fa fa-volume-up" aria-hidden="true" />
                                            </a>
                                            <a // eslint-disable-line
                                              className="list-btn"
                                              onClick={this.togglePlayList}
                                            >
                                                <i className="fa fa-list-ul" aria-hidden="true" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="progress-wrap">
                                        <div className="progress-bar">
                                            <div // eslint-disable-line
                                              className="played-progress"
                                              ref={node => (this.progressBar = node)}
                                              style={{
                                                  width: `${curPos}%`,
                                              }}
                                            ></div>
                                            <i
                                              className="progress-btn"
                                              ref={node => (this.progressBtn = node)}
                                              style={{
                                                  left: `${curPos}%`,
                                              }}
                                              onMouseDown={this.startSeek}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="play-list" />
                    </div>
                </div>
            </DraggableArea>
        );
    }
}

export default wrapApp(Music);
