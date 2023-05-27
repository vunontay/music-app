import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/images';
import Search from '~/Layouts/components/Search';
import { RiBarChartHorizontalFill, RiCloseCircleFill } from 'react-icons/ri';
import User from '~/components/User/User';

const cx = classNames.bind(styles);

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        // Retrieve user from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleClickNav = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Clear user from local storage and reset user state
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedOut(true);
        window.location.reload(); // Reload the page
    };

    const handleLogin = () => {
        setIsLoggedOut(false);
    };

    return (
        <div className={cx('header', 'grid')}>
            <header className={cx('wrapper', 'grid wide')}>
                <div className={cx('inner')}>
                    <Link to={config.routes.home} className={cx('logo-link', 'l-1', 'c-2')}>
                        <img src={images.logo} alt="Music VN" />
                    </Link>

                    <Search />

                    <div className={cx('user', { 'is-open': isOpen })}>
                        {user && !isLoggedOut ? (
                            <div className={cx('user-container')}>
                                <User user={user} onLogout={handleLogout} />
                            </div>
                        ) : (
                            <div className={cx('login-bar', { 'is-open': isOpen })}>
                                <div className={cx('login')}>
                                    <Link to={config.routes.login} onClick={handleLogin}>
                                        Đăng nhập
                                    </Link>
                                </div>

                                <div className={cx('register')}>
                                    <Link to={config.routes.login}>Đăng ký</Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {isOpen && <div className={cx('overlay', { 'is-open': isOpen })} onClick={handleClickNav}></div>}

                    <div onClick={handleClickNav} className={cx('bar')}>
                        {user && !isLoggedOut ? (
                            <div className={cx('user-img')}>
                                <img src={user.photoURL} alt="dp" referrerPolicy="no-referrer" />
                            </div>
                        ) : (
                            <span>{isOpen ? <RiCloseCircleFill /> : <RiBarChartHorizontalFill />}</span>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
