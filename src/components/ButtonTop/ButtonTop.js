import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './ButtonTop.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const listenToScroll = () => {
        let heightToHidden = 20;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            {isVisible && (
                <div className={cx('top-btn')} onClick={goToBtn}>
                    <FaArrowUp className={cx('top-btn--icon')} />
                </div>
            )}
        </div>
    );
};

export default GoToTop;
