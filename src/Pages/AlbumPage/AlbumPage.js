import classNames from 'classnames/bind';
import styles from './AlbumPage.module.scss';
import Header from '~/Layouts/components/Header/Header';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';

import Footer from '~/Layouts/components/Footer/Footer';
import BoxAlbum from '~/Layouts/components/Body/BoxAlbum/BoxAlbum';
const cx = classNames.bind(styles);
function Albums() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('header-menu')}>
                    <HeaderTopMenu />
                </div>
                <div className={cx('albums', 'grid')}>
                    <BoxAlbum className={cx('grid wide')} />
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Albums;
