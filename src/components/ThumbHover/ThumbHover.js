import React from 'react';
import styles from './ThumbHover.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function ThumbHover() {
    return (  
        <div className={cx('my-icon')}>
            <img className={cx('icon-hover')} src={images.hover} alt=''/>
        </div>
    );
}

export default ThumbHover;