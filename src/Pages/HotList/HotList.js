import classNames from 'classnames/bind';
import styles from './Holist.module.scss';
import Header from '~/Layouts/components/Header/Header';
import Player from '../Player/Player';
import Footer from '~/Layouts/components/Footer/Footer';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';
import BoxSongNew from '~/Layouts/components/Body/BoxSongNew/BoxSongNew';
const cx = classNames.bind(styles);

function HotList() {
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
                    <Player />
                </div>
                <div className={cx('new')}>
                    <BoxSongNew />
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default HotList;
