import classNames from 'classnames/bind';
import styles from './PlayerPage.module.scss';
import Header from '~/Layouts/components/Header/Header';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';
import Player from '../Player/Player';
import Footer from '~/Layouts/components/Footer/Footer';
const cx = classNames.bind(styles);

function PlayerPage() {
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
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default PlayerPage;
