import { useEffect, useState } from 'react';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function User() {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        const savedProfilePicture = localStorage.getItem('profilePicture');
        if (savedProfilePicture) {
            setProfilePicture(savedProfilePicture);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('profilePicture');
        window.location.reload(); // Reload the page
    };

    return (
        <>
            {user && (
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
            )}
        </>
    );
}

export default User;
