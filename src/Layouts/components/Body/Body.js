import styles from './Body.module.scss';
import classNames from 'classnames/bind';
import Content from '~/Layouts/components/Body/Content/Content';
import ListenToday from './ListenToday/ListenToday';
import BoxAlbum from './BoxAlbum/BoxAlbum';
import BoxVideo from './BoxVideo/BoxVideo';
import BoxSongNew from './BoxSongNew/BoxSongNew';
import Partner from './Partner/Partner';
import '~/Grid.scss';
const cx = classNames.bind(styles);

function Body() {
    return (
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('inner', 'grid wide')}>
                <Content />
            </div>
            <div className={cx('inner-slider', 'grid wide')}>
                <ListenToday />
            </div>
            <div className={cx('inner-album', 'grid wide')}>
                <BoxAlbum />
            </div>
            <div className={cx('inner-video', 'grid wide')}>
                <BoxVideo />
            </div>
            <div className={cx('inner-new', 'grid wide')}>
                <BoxSongNew />
            </div>
            <div className={cx('inner-partner', 'grid wide')}>
                <Partner />
            </div>
        </div>
    );
}

export default Body;
