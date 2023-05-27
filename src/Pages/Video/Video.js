import Header from '~/Layouts/components/Header/Header';
import Footer from '~/Layouts/components/Footer/Footer';
import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import BoxVideo from '~/Layouts/components/Body/BoxVideo/BoxVideo';
import MV from '../MV/MV';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Video() {
    const [height, setHeight] = useState(60);

    useEffect(() => {
        const mvElement = document.querySelector(`.${cx('mv')}`);
        if (mvElement) {
            const mvHeight = mvElement.offsetHeight;
            if (mvHeight < 30) {
                setHeight(0);
            }
        }
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('header-menu')}>
                    <HeaderTopMenu />
                </div>
                <div className={cx('mv')} style={{ padding: height < 30 ? 0 : '' }}>
                    <MV></MV>
                </div>
                <div className={cx('video')} style={{ padding: height < 30 ? 0 : '' }}>
                    <BoxVideo></BoxVideo>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Video;
