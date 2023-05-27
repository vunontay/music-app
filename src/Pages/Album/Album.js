import Header from '~/Layouts/components/Header/Header';
import Footer from '~/Layouts/components/Footer/Footer';
import styles from './Album.module.scss';
import classNames from 'classnames/bind';
import BoxAlbum from '~/Layouts/components/Body/BoxAlbum/BoxAlbum';
import Player from '../Player/Player';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';

const cx = classNames.bind(styles);

function Album() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('header-menu')}>
                    <HeaderTopMenu />
                </div>
                <div className={cx('player')}>
                    <Player></Player>
                </div>
                <div className={cx('album')}>
                    <BoxAlbum></BoxAlbum>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Album;
