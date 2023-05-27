import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styles from '~/Layouts/components/Body/Body.module.scss';
import classNames from 'classnames/bind';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import '~/Grid.scss';
const cx = classNames.bind(styles);

function Content() {
    const [data, setData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        axios
            .get('https://server-tau-six.vercel.app/api/home')
            .then((response) => {
                const filterData = response.data.data.items.find((item) => item.sectionType === 'banner').items;
                setData(filterData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getRandomIndex = useCallback(() => {
        return Math.floor(Math.random() * data.length);
    }, [data]);

    const displayRandomImage = useCallback(() => {
        const index = getRandomIndex();
        setCurrentSlide(index);
    }, [getRandomIndex]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            displayRandomImage();
        }, 5000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [displayRandomImage]);

    const nextSlide = () => {
        if (currentSlide === data.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(data.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className={cx('slider', 'mt-20')}>
            <div className={cx('slider-left')}>
                {data.map((item, index) => (
                    <div key={item.encodeId} className={cx('banner', { active: index === currentSlide })}>
                        <Link>
                            <img src={item.banner} alt={item.title} />
                        </Link>
                        <BsChevronLeft onClick={prevSlide} className={cx('btn-prev')}></BsChevronLeft>
                        <BsChevronRight onClick={nextSlide} className={cx('btn-next')}></BsChevronRight>
                    </div>
                ))}
            </div>
            <div className={cx('slider-right', 'hide-on-mobile', 'hide-on-tablet')}>
                {data.map((item) => (
                    <Link key={item.encodeId}>
                        <img src={item.banner} alt={item.title} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Content;
