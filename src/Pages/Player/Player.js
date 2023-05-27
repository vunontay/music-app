import React, { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiRepeat, CiShuffle } from 'react-icons/ci';
import {
    MdSkipNext,
    MdSkipPrevious,
    MdPlayCircle,
    MdPauseCircle,
    MdVolumeUp,
    MdOutlineVolumeOff,
} from 'react-icons/md';
import axios from 'axios';
import moment from 'moment';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import style from './Player.module.scss';
const cx = classNames.bind(style);

function Player() {
    const audioEl = useRef(new Audio());
    const audio = audioEl.current;
    const intervalRef = useRef(null);
    const location = useLocation();
    const songDetail = location.state;
    const songs = songDetail?.song?.items;

    const [song, setSong] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [id, setId] = useState(null);
    const [idSearch, setIdSearch] = useState(null);
    const [second, setSecond] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [volume, setIsVolume] = useState(70);
    const [selectedSongLyric, setSelectedSongLyric] = useState([]);
    const [showLyrics, setShowLyrics] = useState(false);
    const [lyricsHeight, setLyricsHeight] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const thumbRef = useRef(null);
    const trackRef = useRef();
    const textRef = useRef(null);

    const songData = selectedSong || songDetail;

    // const myData = localStorage.getItem('songDetail');
    // const myObject = JSON.parse(myData);
    // console.log(myObject);
    useEffect(() => {
        if (idSearch) {
            setId(null);
        }
    }, [idSearch]);
    useEffect(() => {
        setIdSearch(songDetail?.encodeId);
    }, [songDetail?.encodeId]);

    useEffect(() => {
        if (id || idSearch) {
            if (isInitialLoad) {
                setIsInitialLoad(false);
            } else {
                axios
                    .get(`https://server-tau-six.vercel.app/api/song?id=${id || idSearch}`)
                    .then((response) => {
                        const selectedSongId = response.data.data['128'];

                        // navigate(config.routes.album.id, { state: selectedSong || songDetail });
                        if (selectedSongId) {
                            setId(selectedSongId);
                            // navigate(config.routes.album.id, { state: selectedSong || songDetail });
                        } else {
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                axios
                    .get(`https://server-tau-six.vercel.app/api/lyric?id=${id || idSearch}`)
                    .then((response) => {
                        const selectedSongLyric = response.data.data.sentences.map((sentence) => {
                            return sentence.words
                                .map((word) => {
                                    return word.data;
                                })
                                .join([' ']);
                        });
                        setSelectedSongLyric(selectedSongLyric);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [id, songDetail, idSearch, isInitialLoad]);

    useEffect(() => {
        let errorCount = 0;

        const handleAudioError = () => {
            errorCount++;
            if (errorCount === 2) {
                setTimeout(() => {
                    toast.error('Not VIP Account');
                }, 3000);
            }
        };

        if (audio) {
            audio.addEventListener('error', handleAudioError);
            return () => {
                audio.removeEventListener('error', handleAudioError);
            };
        }
    }, [audio]);

    useEffect(() => {
        // ...

        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songData?.duration) / 100;
                thumbRef.current && (thumbRef.current.style.cssText = `right: ${100 - percent}%`);
                setSecond(Math.round(audio.currentTime));
            }, 500);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isPlaying, selectedSong, audio, selectedSongLyric, songData]);

    useEffect(() => {
        if (songs) {
            setSong(songs);
        }
    }, [songs]);

    useEffect(() => {
        if (id) {
            audio.pause();
            audio.src = id;
            audio.play();
        } else {
            audio.pause();
            audio.src = idSearch;
            setIsPlaying(true);
            audio.play();
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            audio.pause();
        };
    }, [audio, id, idSearch]);
    useEffect(() => {
        if (isPlaying) audio.play();
    }, [isPlaying, audio]);

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume, audio]);

    const handleClickSong = (song) => {
        const id = song.encodeId;
        setId(id);
        setSelectedSong(song);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
            setIsPlaying(!isPlaying); // sử dụng ngược lại của isPlaying
        } else {
            audio.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleNextSong = () => {
        if (selectedSong) {
            const currentIndexSong = song.findIndex((item) => item.encodeId === selectedSong.encodeId);
            const nextIndex = currentIndexSong + 1 >= song.length ? 0 : currentIndexSong + 1;
            const nextSong = song[nextIndex];
            const inNext = nextSong?.encodeId;
            const id = inNext;
            setId(id);
            setSelectedSong(nextSong);
            setIsPlaying(true);
        }
    };

    const handlePrevSong = () => {
        if (selectedSong) {
            const currentIndexSong = song.findIndex((item) => item.encodeId === selectedSong.encodeId);
            const prevIndex = currentIndexSong - 1 < 0 ? song.length - 1 : currentIndexSong - 1;
            const prevSong = song[prevIndex];
            const inPrev = prevSong?.encodeId;
            const id = inPrev;
            setId(id);
            setSelectedSong(prevSong);
        }
    };

    const handleRandom = () => {
        let nextIndex;
        const currentIndexSong = song.findIndex((item) => item.encodeId === selectedSong?.encodeId);
        if (selectedSong) {
            nextIndex = Math.floor(Math.random() * song.length);
        } else {
            nextIndex = currentIndexSong + 1 >= song.length ? 0 : currentIndexSong + 1;
        }
        const nextSong = song[nextIndex];
        const inNext = nextSong?.encodeId;

        setId(inNext);
        setSelectedSong(nextSong);
        setIsPlaying(true);
    };

    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
        audio.currentTime = 0;
        audio.play();
    };

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleRandom(); // Chuyển sang chế độ shuffle nếu tính năng lặp lại được bật
            } else if (isRepeat) {
                handleRepeat();
            } else if (!isShuffle) {
                handleNextSong();
            } else {
                handleNextSong(); // Chuyển đến bài hát tiếp theo nếu không có tính năng nào được bật
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    });

    const handleClickProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect();

        const percent = Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100;
        thumbRef.current && (thumbRef.current.style.cssText = `right: ${100 - percent}%`);

        audio.currentTime = (percent * songData?.duration) / 100;
        console.log(audio.currentTime);
        setSecond(Math.round((percent * songData?.duration) / 100));
    };

    const handleClickShowLyric = () => {
        const textElement = textRef.current;
        const height = textElement.scrollHeight;
        setLyricsHeight(showLyrics ? 250 : height);
        setShowLyrics(!showLyrics);
    };

    return (
        <>
            <div className={cx('player', 'row', 'grid wide')}>
                <div className={cx('player-left', 'l-9', 'm-12', 'c-12')}>
                    {songData && (
                        <h1 className={cx('name-detail')}>
                            {songData.title && <span>{songData.title}</span>}
                            {songData.artistsNames && <span className={cx('artist')}>{songData.artistsNames}</span>}
                            {songData.album && <p className={cx('description')}>{songData.album.title}</p>}
                        </h1>
                    )}

                    <div className={cx('audio-player')}>
                        <div className={cx('audio-box')}>
                            <div className={cx('audio-img')}>
                                {songData && <img src={songData.thumbnail} alt={songData.aliasTitle}></img>}
                            </div>
                        </div>
                        <div className={cx('audio-title')}>
                            <Link>{songData?.title}</Link>
                        </div>

                        <div className={cx('audio-control', 'm-12', 'c-12')}>
                            <div className={cx('control-bar')}>
                                <div className={cx('volume-control')}>
                                    <span onClick={() => setIsVolume((prev) => (+prev === 0 ? 70 : 0))}>
                                        {+volume === 0 ? <MdOutlineVolumeOff /> : <MdVolumeUp />}
                                    </span>
                                    <input
                                        onChange={(e) => setIsVolume(e.target.value)}
                                        value={volume}
                                        type="range"
                                        step={1}
                                        min={0}
                                        max={100}
                                        className={cx('volume')}
                                    />
                                </div>
                                <span
                                    onClick={handleShuffle}
                                    style={{ color: isShuffle ? '#21b685' : 'white' }}
                                    title="Bật phát ngẫu nhiên"
                                >
                                    <CiShuffle />
                                </span>
                                <span onClick={handlePrevSong}>
                                    <MdSkipPrevious />
                                </span>
                                <span onClick={handlePlayPause} className={cx('icon-playback')}>
                                    {isPlaying ? <MdPauseCircle /> : <MdPlayCircle />}
                                </span>
                                <span onClick={handleNextSong}>
                                    <MdSkipNext />
                                </span>
                                <span
                                    onClick={handleRepeat}
                                    style={{ color: isRepeat ? '#21b685' : 'white' }}
                                    title="Bật phát lại tất cả"
                                >
                                    <CiRepeat />
                                </span>
                            </div>
                            <div className={cx('progress-bar')}>
                                <span className={cx('start')}>{moment.utc(second * 1000).format('mm:ss')}</span>
                                <div ref={trackRef} onClick={handleClickProgressBar} className={cx('progress-time')}>
                                    <div ref={thumbRef} className={cx('rail')}></div>
                                </div>
                                <span className={cx('end')}>
                                    {moment.utc(songData?.duration * 1000).format('mm:ss')}
                                </span>
                            </div>
                        </div>

                        <div className={cx('audio-overlay')}>
                            {songData && <img src={songData.thumbnail} alt={songData.aliasTitle}></img>}
                        </div>
                    </div>
                    <div className={cx('lyric-player')}>
                        <h1 className={cx('name-detail')}>Lời bài hát</h1>
                        <h4 className={cx('lyric-hide')} onClick={handleClickShowLyric}>
                            {showLyrics ? 'Ẩn bớt' : 'Xem thêm'}
                        </h4>
                        <div
                            className={cx('lyric-songs')}
                            ref={textRef}
                            style={{ height: lyricsHeight, overflow: 'hidden' }}
                        >
                            {selectedSongLyric.map((lyric, index) => {
                                return <p key={index}>{lyric}</p>;
                            })}
                        </div>
                    </div>
                </div>
                <div className={cx('player-right', 'l-3', 'm-12', 'c-12')}>
                    <div className={cx('player-header')}>
                        <h3 className={cx('title')}>Danh sách bài hát</h3>
                        <p className={cx('author')}>
                            <span className={cx('songs')}>{songDetail?.song?.total}</span>
                            bài hát
                        </p>
                    </div>
                    <div className={cx('player-list')}>
                        {Array.isArray(song) &&
                            song.map((item) => (
                                <div
                                    onClick={() => handleClickSong(item)}
                                    className={cx('list-item')}
                                    key={item.encodeId}
                                >
                                    <img className={cx('list-img')} src={item.thumbnail} alt={item.title} />
                                    <h3 className={cx('list-info')}>
                                        <Link className={cx('name-song')}>{item.title}</Link>
                                        <Link className={cx('artist-song')}>{item.artistsNames}</Link>
                                    </h3>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Player;
