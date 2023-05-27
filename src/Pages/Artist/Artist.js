import Header from '~/Layouts/components/Header/Header';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';
import Footer from '~/Layouts/components/Footer/Footer';
import config from '~/config';

import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsFillHeartFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import moment from 'moment/moment';
const cx = classNames.bind(styles);
function Artist() {
    const location = useLocation();
    const navigate = useNavigate();

    const artists = location.state;
    const [id, setId] = useState(artists?.encodeId);
    const [data, setData] = useState([]);
    const [song, setSong] = useState(null);
    const [detail, setDetail] = useState(null);
    useEffect(() => {
        if (id) {
            setId(id);
        }
    }, [id]);
    useEffect(() => {
        axios
            .get(`https://server-tau-six.vercel.app/api/detailplaylist?id=${id}`)
            .then((response) => {
                const data = response.data.data;
                setData(data);

                const song = data.song.items;
                setSong(song);
                setDetail(song);
            })
            .catch((error) => {
                return error;
            });
    }, [id]);

    useEffect(() => {
        if (detail) {
            setDetail(detail);
        }
    }, [detail]);

    const handleClickSong = (item) => {
        if (item) {
            const detail = item;
            console.log(detail);
            setDetail(detail);
            setData(data);
            navigate(config.routes.player, { state: detail && data });
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('header-menu')}>
                    <HeaderTopMenu />
                </div>
                <div className={cx('artist', 'grid')}>
                    <div className={cx('artist-box', 'row', 'grid wide')}>
                        <div className={cx('artist-img', 'l-4', 'm-4', 'c-4')}>
                            <img src={data?.thumbnailM} alt="" />
                        </div>
                        <div className={cx('artist-info', 'l-7', 'm-7', 'c-7')}>
                            <h4>{data?.title}</h4>
                            <div>
                                Playlist by <span className={cx('name')}>{data?.artistsNames}</span>
                                <span className={cx('follow')}>
                                    {data?.like}
                                    <BsFillHeartFill />
                                </span>
                            </div>
                            <div>
                                <span>{data?.sortDescription}</span>
                            </div>
                            <div>
                                <button className={cx('btn-play')}>
                                    <FaPlay />
                                    <span>PLAY</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('song', 'grid')}>
                    <div className={cx('song-box', 'row', 'grid wide')}>
                        {song?.map((item) => (
                            <div
                                onClick={() => handleClickSong(item)}
                                className={cx('song-item', 'l-12', 'm-12', 'c-12')}
                                key={item.encodeId}
                            >
                                <div className={cx('song-img')}>
                                    <img src={item.thumbnail} alt={item.title} />
                                </div>
                                <div className={cx('song-info')}>
                                    <div className={cx('song-name')}>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={cx('song-duration')}>
                                        {moment.utc(item.duration * 1000).format('mm:ss')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Artist;
