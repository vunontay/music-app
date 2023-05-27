import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { TiSocialFacebook, TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti';
import { BsApple, BsAndroid2 } from 'react-icons/bs';

import images from '~/assets/images';
import '~/Grid.scss';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper', 'grid')}>
            <div className={cx('inner', 'grid wide')}>
                <div className={cx('footer', 'row')}>
                    <ul className={cx('footer-list', 'l-2', 'm-3', 'c-6')}>
                        <li className={cx('footer__item-top')}>Thông tin</li>
                        <li className={cx('footer__item')}>
                            <Link>Giới thiệu</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>Điều khoản sử dụng</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>Quyền riêng tư</Link>
                        </li>
                    </ul>

                    <ul className={cx('footer-list', 'l-2', 'm-3', 'c-6')}>
                        <li className={cx('footer__item-top')}>Bài hát</li>
                        <li className={cx('footer__item')}>
                            <Link>Album</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>Hostlist</Link>
                        </li>
                    </ul>

                    <ul className={cx('footer-list', 'l-2', 'm-3', 'c-6')}>
                        <li className={cx('footer__item-top')}>BXH</li>
                        <li className={cx('footer__item')}>
                            <Link>MV</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>Nghệ sĩ</Link>
                        </li>
                    </ul>

                    <ul className={cx('footer-list', 'l-2', 'm-3', 'c-6')}>
                        <li className={cx('footer__item-top')}>Kết nối với chúng tôi</li>
                        <li className={cx('footer__item')}>
                            <Link className={cx('footer__icon')}>
                                <TiSocialFacebook></TiSocialFacebook>
                            </Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link className={cx('footer__icon')}>
                                <TiSocialTwitter></TiSocialTwitter>
                            </Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link className={cx('footer__icon')}>
                                <TiSocialYoutube></TiSocialYoutube>
                            </Link>
                        </li>
                    </ul>

                    <ul className={cx('footer-list', 'l-3', 'm-6', 'c-12')}>
                        <li className={cx('footer__item-top')}>Tải ứng dụng</li>
                        <li className={cx('footer__item')}>
                            <Link>Dịch vụ nhac.vn đã có ứng dụng cho</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link id={cx('color-active')}>Mobile, SmartTV</Link>
                        </li>
                        <li className={cx('footer__item', 'img__qr')}>
                            <img className={cx('qr-code')} src={images.qrcode} alt="" />
                        </li>
                        <li className={cx('footer__item', 'btn__down')}>
                            <Link>
                                <button type="button" className={cx('btn__down-app')}>
                                    <BsApple></BsApple>
                                    <h4>Tải cho Iphone</h4>
                                </button>
                            </Link>
                            <Link className={cx('btn__link')}>
                                <button type="button" className={cx('btn__down-app')}>
                                    <BsAndroid2></BsAndroid2>
                                    <h4>Tải cho Android</h4>
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <ul className={cx('footer-list', 'l-1', 'm-6', 'c-4')}>
                        <li className={cx('footer__item-top')}>Liên kết</li>
                        <li className={cx('footer__item')}>
                            <Link>hopamchuan.com</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>tudienwiki.com</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>thuthuattienich.com</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>blogradio.vn</Link>
                        </li>
                        <li className={cx('footer__item')}>
                            <Link>vclick.vn</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
