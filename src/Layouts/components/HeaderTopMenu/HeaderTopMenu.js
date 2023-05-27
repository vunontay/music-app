import classNames from 'classnames/bind';
import { useLocation, Link, useMatch } from 'react-router-dom';
import config from '~/config';

import styles from './HeaderTopMenu.module.scss';
import '~/Grid.scss';
import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
const cx = classNames.bind(styles);

function HeaderTopMenu() {
    const location = useLocation();
    const matchHome = useMatch(config.routes.home);
    const matchAlbums = useMatch(config.routes.albums);
    const matchVideo = useMatch(config.routes.video);
    const matchArtists = useMatch(config.routes.artists);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [activeMenuItem, setActiveMenuItem] = useState('');

    useEffect(() => {
        if (activeMenuItem) {
            setActiveMenuItem(location.pathname);
        }
    }, [location, activeMenuItem]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    setLoading(false);
                    clearInterval(timer);
                }
                return prevProgress + 12.5;
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={cx('header-menu')}>
            <nav>
                <ul className={cx('main-nav', 'grid wide')}>
                    <li className={cx('nav-list')}>
                        <Link className={cx('title-nav')} to={config.routes.home}>
                            Home
                        </Link>
                        <span
                            className={cx({
                                [styles.underline]: matchHome,
                            })}
                        ></span>
                    </li>
                    <li className={cx('nav-list')}>
                        <Link className={cx('title-nav')} to={config.routes.albums}>
                            Album
                        </Link>
                        <span
                            className={cx({
                                [styles.underline]: matchAlbums,
                            })}
                        ></span>
                    </li>

                    <li className={cx('nav-list')}>
                        <Link className={cx('title-nav')} to={config.routes.video}>
                            Music video
                        </Link>
                        <span className={cx({ [styles.underline]: matchVideo })}></span>
                    </li>

                    <li className={cx('nav-list')}>
                        <Link className={cx('title-nav')} to={config.routes.artists}>
                            Nghệ sĩ
                        </Link>
                        <span
                            className={cx({
                                [styles.underline]: matchArtists,
                            })}
                        ></span>
                    </li>
                </ul>
            </nav>
            <div className={cx('loading-bar')}>{loading && <LoadingBar color="#21b685" progress={progress} />}</div>
        </div>
    );
}

export default HeaderTopMenu;
