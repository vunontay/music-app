import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '~/Layouts/components/Body/Body.module.scss';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '~/Layouts/components/Body/CustomSlick.css';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ListenToday() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [songDetail, setSongDetail] = useState(null);

    const props = {
        title: 'Playlist Cho Hôm Nay',
    };
    useEffect(() => {
        axios
            .get('https://server-tau-six.vercel.app/api/home')
            .then((response) => {
                const data = response.data.data.items.map((item) => item);

                const filterData = data.find((item) => item.sectionType === 'newReleaseChart').items;

                setData(filterData);
                setSongDetail(filterData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (songDetail) {
            setSongDetail(songDetail);
        }
    }, [songDetail]);
    const handleClickBanner = (item) => {
        const songDetail = item;
        console.log(songDetail.encodeId);
        setSongDetail(songDetail);
        navigate(config.routes.album, { state: songDetail });
    };

    return (
        <div className={cx('playlist', 'grid')}>
            <div className={cx('slick')}>
                <h2>{props.title}</h2>
                <Slider
                    dots={false}
                    arrows={true}
                    infinite={true}
                    autoplay={true}
                    autoplaySpeed={2000}
                    speed={500}
                    slidesToShow={5}
                    slidesToScroll={1}
                    className={cx('slick-list')}
                >
                    {data.map((item, index) => (
                        <div
                            onClick={() => handleClickBanner(item)}
                            key={item.encodeId}
                            className={cx('slick-item')}
                            style={{ display: index === 5 ? 'none' : 'block' }}
                        >
                            <img src={item.thumbnailM} alt={item.title} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ListenToday;
