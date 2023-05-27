import Header from '~/Layouts/components/Header/Header';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';
import Footer from '~/Layouts/components/Footer/Footer';

import classNames from 'classnames/bind';
import styles from './Artists.module.scss';
import BoxSongNew from '~/Layouts/components/Body/BoxSongNew/BoxSongNew';
const cx = classNames.bind(styles);
function Artists() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('header-menu')}>
                    <HeaderTopMenu />
                </div>
                <div className={cx('artists')}>
                    <BoxSongNew />
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Artists;
