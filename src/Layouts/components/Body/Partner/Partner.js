import styles from './Partner.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Partner() {
    const props = {
        title: 'Đối tác âm nhạc',
    };
    return (
        <div className={cx('partner', 'row')}>
            <div className={cx('partner-title', 'l-12', 'm-12', 'c-12')}>
                <Link>
                    <h2>{props.title}</h2>
                </Link>
            </div>
            <div className={cx('partner-list', 'm-12', 'c-12')}>
                <ul className={cx('partner-nav', 'm-12', 'c-12')}>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner1} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner2} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner3} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner4} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner5} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner6} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner7} alt="" />
                        </Link>
                    </li>
                    <li className={cx('partner-item')}>
                        <Link>
                            <img src={images.partner8} alt="" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Partner;
