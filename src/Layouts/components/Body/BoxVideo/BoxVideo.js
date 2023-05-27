import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoxVideo.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import ThumbHover from '~/components/ThumbHover/ThumbHover';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function BoxVideo(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [charts, setCharts] = useState([]);
    const [mvDetail, setMvDetail] = useState(null);
    const [selectedMvId, setSelectedPlaylistId] = useState(null);
    useEffect(() => {
        axios
            .get('https://server-tau-six.vercel.app/api/listmv?id=IWZ9Z08I&page=1&count=30')
            .then((response) => {
                const filterData = response.data.data.items.map((item) => {
                    // console.log(item);
                    return item;
                });
                const filterData2 = filterData;
                setData(filterData.slice(-1));

                setData2(filterData2.slice(0, 8));
                const filterCharts = response.data.data.items.map((item) => item);
                setCharts(filterCharts.slice(-5));
            })
            .catch((error) => {
                console.log(error);
            });
        if (selectedMvId) {
            axios
                .get(`https://server-tau-six.vercel.app/api/video?id=${selectedMvId}`)
                .then((response) => {
                    const mvDetail = response.data.data;
                    setMvDetail(mvDetail);

                    // Lưu giá trị của songDetail vào localStorage
                    // localStorage.setItem('songDetail', JSON.stringify(selectedPlaylistDetail));
                    navigate(config.routes.video, { state: mvDetail });
                })
                .catch((error) => {
                    console.log('Invalid');
                });
        }
    }, [selectedMvId, navigate]);

    const handleClickVideo = (item) => {
        if (item) {
            const selectedMvId = item.encodeId;
            setSelectedPlaylistId(selectedMvId);

            setMvDetail(mvDetail);
            // navigate(config.routes.video, { state: mvDetail });
        }
    };

    return (
        <div className={cx('video', 'row', 'grid wide')}>
            <div className={cx('video-left', 'l-9', 'm-12', 'c-12')}>
                <h2 className={cx('video-title')}>
                    <Link>Music Video</Link>
                </h2>
                <ul className={cx('video-nav')}>
                    <li>
                        <Link className={cx('nav-link')} activeclassname={cx('active')}>
                            Nghe nhiều
                        </Link>
                    </li>
                    <li>
                        <Link className={cx('nav-link')} activeclassname={cx('active')}>
                            Mới nhất
                        </Link>
                    </li>
                </ul>

                <div className={cx('video-list', 'm-12', 'c-12')}>
                    {data.map((item) => (
                        <div
                            onClick={() => handleClickVideo(item)}
                            className={cx('video-item', 'l-12', 'm-12', 'c-12')}
                            key={item.encodeId}
                        >
                            <ThumbHover classNames={classNames} />
                            <img className={cx('video-img')} alt="" src={item.thumbnailM} />
                            <h3 className={cx('info')}>
                                <Link>{item.title}</Link>
                                <p>{item.artistsNames}</p>
                            </h3>
                        </div>
                    ))}
                </div>

                <div className={cx('mv-list', 'm-12', 'c-12')}>
                    {data2.map((item) => (
                        <div onClick={() => handleClickVideo(item)} className={cx('mv-item')} key={item.encodeId}>
                            <ThumbHover classNames={classNames} />
                            <img className={cx('mv-img')} alt="" src={item.thumbnailM} />
                            <h3 className={cx('info')}>
                                <Link>{item.title}</Link>
                                <p>{item.artistsNames}</p>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('video-right', 'l-3', 'm-12', 'c-12')}>
                <h2 className={cx('video-title')}>
                    <Link>BXH MV</Link>
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
                        <ul onClick={() => handleClickVideo(item)} className={cx('charts-item')} key={item.encodeId}>
                            <li className={cx('charts-rank')}>
                                <span className={cx('charts-index')}>{index + 1}</span>
                                <Link className={cx('charts-img')}>
                                    <img src={item.thumbnailM} alt=""></img>
                                </Link>
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

export default BoxVideo;
