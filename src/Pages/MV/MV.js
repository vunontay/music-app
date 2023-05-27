import classNames from 'classnames/bind';
import styles from './MV.module.scss';
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '~/config';

const cx = classNames.bind(styles);
function MV() {
    const navigate = useNavigate();
    const location = useLocation();
    const mvDetail = location.state;
    // console.log(mvDetail?.streaming?.mp4?.['480p']);
    // console.log(mvDetail);
    const [id, setId] = useState(null);
    const [mvMusic, setMvMusic] = useState(mvDetail);
    const playerRef = useRef(null);
    useEffect(() => {
        if (id) {
            setId(id);
        }
    }, [id]);
    useEffect(() => {
        if (id) {
            axios.get(`https://server-tau-six.vercel.app/api/video?id=${id}`).then((response) => {
                const selectedIdMv = response;
                navigate(config.routes.video, { state: mvMusic });
                console.log(response);
                console.log(selectedIdMv);
            });
        }
    });
    useEffect(() => {
        setMvMusic(mvDetail);
    }, [mvDetail]);

    return (
        <div className={cx('video', 'row', 'grid wide')}>
            <div className={cx('video-left', 'l-12', 'm-12', 'c-12')}>
                {mvDetail && (
                    <h1 className={cx('name-detail')}>
                        {mvDetail.title && <span>{mvDetail.title}</span>}
                        {mvDetail.artistsNames && <span className={cx('artist')}>{mvDetail.artistsNames}</span>}
                        {mvDetail.album && <p className={cx('description')}>{mvDetail.album.title}</p>}
                    </h1>
                )}
                <div className={cx('video-item')}>
                    <ReactPlayer
                        url={mvDetail?.streaming?.mp4?.['720p']}
                        playing={true}
                        controls={true}
                        ref={playerRef}
                        width={'100%'}
                        height={'100%'}
                    />
                </div>
            </div>
        </div>
    );
}

export default MV;
