import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '~/Layouts/components/Body/Body.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import ThumbHover from '~/components/ThumbHover/ThumbHover';
import images from '~/assets/images';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function BoxAlbum() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [charts, setCharts] = useState([]);

    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [songDetail, setSongDetail] = useState(null);

    useEffect(() => {
        axios
            .get('https://server-tau-six.vercel.app/api/home')
            .then((response) => {
                if (response.status === 200) {
                    const playlistData = response.data.data.items.find((item) => item.sectionType === 'playlist').items;
                    setData(playlistData.slice(0, 8));

                    const chartData = response.data.data.items.find(
                        (item) => item.sectionType === 'newReleaseChart',
                    ).items;
                    setCharts(chartData.slice(0, 7));
                }
            })
            .catch((error) => {
                console.log(error);
            });

        if (selectedPlaylistId) {
            axios
                .get(`https://server-tau-six.vercel.app/api/detailplaylist?id=${selectedPlaylistId}`)
                .then((response) => {
                    const selectedPlaylistDetail = response.data.data;
                    setSongDetail(selectedPlaylistDetail);

                    // Lưu giá trị của songDetail vào localStorage
                    // localStorage.setItem('songDetail', JSON.stringify(selectedPlaylistDetail));
                    navigate(config.routes.album.id, { state: selectedPlaylistDetail });
                })
                .catch((error) => {
                    console.log('Invalid');
                });
        }
    }, [selectedPlaylistId, navigate]);

    useEffect(() => {
        if (songDetail && Object.keys(songDetail).length > 0) {
            navigate(config.routes.album, { state: songDetail });
        }
    }, [songDetail, navigate]);

    const handleClickSong = (item) => {
        if (item) {
            const songDetail = item;
            setSongDetail(songDetail);
            navigate(config.routes.player, { state: songDetail });
        }
    };

    const handleClickAlbum = (item) => {
        if (item) {
            const selectedPlaylistId = item.encodeId;
            setSelectedPlaylistId(selectedPlaylistId);
        }
    };

    return (
        <div className={cx('album', 'row', 'grid wide')}>
            <div className={cx('album-left', 'l-9', 'm-12', 'c-12')}>
                <h2 className={cx('album-title')}>
                    <Link>Album</Link>
                </h2>
                <ul className={cx('album-nav')}>
                    <li>
                        <Link className={cx('nav-link')} to="/" activeclassname={cx('active')}>
                            Nghe nhiều
                        </Link>
                    </li>
                    <li>
                        <Link className={cx('nav-link')} to="/" activeclassname={cx('active')}>
                            Mới nhất
                        </Link>
                    </li>
                </ul>

                <div className={cx('album-list')}>
                    {data.map((item) => (
                        <div onClick={() => handleClickAlbum(item)} className={cx('album-item')} key={item.encodeId}>
                            <ThumbHover classNames={classNames} />

                            <img src={item.thumbnail} alt={item.title} />
                            <h3 className={cx('info')}>
                                <Link>{item.title}</Link>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('album-right', 'l-3', 'm-12', 'c-12')}>
                <h2 className={cx('album-title')}>
                    <Link>BXH Bài hát</Link>
                </h2>
                <div className={cx('charts')}>
                    <ul className={cx('charts-nav')}>
                        <li>
                            <Link className={cx('charts-link')} to="/" activeclassname={cx('active')}>
                                Việt Nam
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('charts-link')} to="/" activeclassname={cx('active')}>
                                Âu Mỹ
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('charts-link')} to="/" activeclassname={cx('active')}>
                                Hàn Quốc
                            </Link>
                        </li>
                    </ul>
                    <Link className={cx('icon-play')} to="/">
                        <span>
                            <img src={images.icon} alt="icon-play"></img>
                        </span>
                    </Link>
                </div>
                <div className={cx('charts-box')}>
                    {charts.map((item, index) => (
                        <ul onClick={() => handleClickSong(item)} className={cx('charts-item')} key={item.encodeId}>
                            <li className={cx('charts-rank')}>
                                <span className={cx('charts-index')}>{index + 1}</span>
                                <div className={cx('charts-info')}>
                                    <h3>
                                        <Link>{item.title}</Link>
                                        <p>{item.artistsNames}</p>
                                    </h3>
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BoxAlbum;
