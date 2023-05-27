import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { TiSocialFacebook } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';

import Header from '~/Layouts/components/Header/Header';
import Footer from '~/Layouts/components/Footer/Footer';
import { auth, provider, providerGoogle } from '~/firebase';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { useState, useEffect } from 'react';
import HeaderTopMenu from '~/Layouts/components/HeaderTopMenu/HeaderTopMenu';

const cx = classNames.bind(styles);

function Login() {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const handleFacebookLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log(result.user.providerData);

                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('profilePicture', profilePicture);

                fetch(
                    `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`,
                )
                    .then((response) => response.blob())
                    .then((blob) => {
                        setProfilePicture(URL.createObjectURL(blob));
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const user = result.user;
                setUser(user);
                // console.log(user);
                localStorage.setItem('user', JSON.stringify(result.user));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('profilePicture');
    };
    useEffect(() => {
        // Kiểm tra nếu đã lưu thông tin người dùng trong localStorage
        const savedUser = localStorage.getItem('user');
        const savedProfilePicture = localStorage.getItem('profilePicture');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedProfilePicture) {
            setProfilePicture(savedProfilePicture);
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('header-menu')}>
                <HeaderTopMenu />
            </div>
            <div className={cx('login')}>
                {user ? (
                    <>
                        <div className={cx('account')}>
                            <div className={cx('photo')}>
                                {profilePicture ? (
                                    <img src={profilePicture} alt="dp" referrerPolicy="no-referrer" />
                                ) : (
                                    <img src={user.photoURL} alt="dp" referrerPolicy="no-referrer" />
                                )}
                            </div>

                            <h3>{user.displayName}</h3>
                            <p>{user.email}</p>
                            <button className={cx('logout')} onClick={handleLogout}>
                                Đăng Xuất
                            </button>
                        </div>
                    </>
                ) : (
                    <form className={cx('form-login')}>
                        <div className={cx('login-step1')}>
                            <div className={cx('login-top')}>
                                <Link className={cx('login-logo')}>
                                    <img src={images.logo} alt="" />
                                </Link>
                            </div>

                            <div className={cx('login-bottom')}>
                                <h4>Đăng Nhập Với</h4>
                                <ul className={cx('login-list')}>
                                    <li onClick={handleFacebookLogin}>
                                        <Link className={cx('facebook')}>
                                            <TiSocialFacebook />
                                            <p>Facebook</p>
                                        </Link>
                                    </li>
                                    <li onClick={handleGoogleLogin}>
                                        <Link className={cx('google')}>
                                            <FcGoogle />
                                            <p> Google</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <h3 className={cx('forget')}>
                            Bạn không nhớ tài khoản của mình? <Link>Tìm hiểu ngay</Link>
                        </h3>
                    </form>
                )}
            </div>

            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}
export default Login;
