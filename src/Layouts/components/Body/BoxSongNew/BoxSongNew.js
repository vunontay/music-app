import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './BoxSongNew.module.scss';
import Ads from '~/components/Ads/Ads';
import config from '~/config';
const cx = classNames.bind(styles);

function BoxSongNew() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [dataArtist, setDataArtist] = useState([]);
    const [artist, setArtist] = useState([]);
    const [detail, setDetail] = useState(null);
    useEffect(() => {
        axios
            .get('https://server-tau-six.vercel.app/api/home')
            .then((response) => {
                const filterData = response.data.data.items.find(
                    (item) => item.sectionType === 'newReleaseChart',
                ).items;
                setData(filterData);
                setDetail(filterData);
                const filterArtist = response.data.data.items.find(
                    (item) => item.sectionType === 'playlist' && item.title === 'Nghệ sĩ thịnh hành',
                ).items;
                console.log(filterArtist);
                setArtist(filterArtist);
                setDataArtist(filterArtist);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (detail) {
            setDetail(detail);
        }
    }, [detail]);

    useEffect(() => {
        if (dataArtist) {
            setDataArtist(dataArtist);
        }
    }, [dataArtist]);

    const handleClickSong = (item) => {
        if (item) {
            const detail = item;
            setDetail(detail);
            navigate(config.routes.hotlist, { state: detail });
        }
    };

    const handleClickArtist = (item) => {
        if (item) {
            const dataArtist = item;
            setDataArtist(dataArtist);
            navigate(config.routes.artist, { state: dataArtist });
        }
    };

    return (
        <div className={cx('new', 'row', 'grid wide')}>
            <div className={cx('new-left', 'l-9', 'm-12', 'c-12')}>
                <h2 className={cx('new-title')}>
                    <Link>Bài hát mới phát hành</Link>
                </h2>
                <div className={cx('new-box')}>
                    {data.map((item) => (
                        <ul onClick={() => handleClickSong(item)} className={cx('new-item')} key={item.encodeId}>
                            <li className={cx('new-rank')}>
                                <Link className={cx('new-img')}>
                                    <img src={item.thumbnail} alt=""></img>
                                </Link>
                                <div className={cx('new-info')}>
                                    <h3>
                                        <Link>{item.title}</Link>
                                        <p>{item.artistsNames}</p>
                                    </h3>
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
                <h2 className={cx('artist-title')}>
                    <Link>Nghệ sĩ nổi bật</Link>
                </h2>
                <div className={cx('artist-box')}>
                    {artist.map((item) => (
                        <div onClick={() => handleClickArtist(item)} key={item.encodeId} className={cx('artist-img')}>
                            <img src={item.thumbnailM} alt=""></img>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('new-right', 'l-3', 'hide-on-mobile', 'hide-on-tablet')}>
                <Ads />
            </div>
        </div>
    );
}

export default BoxSongNew;
