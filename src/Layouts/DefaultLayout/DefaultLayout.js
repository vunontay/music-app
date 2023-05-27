import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '~/Layouts/components/Header';
import Body from '~/Layouts/components/Body';
import Footer from '../components/Footer/Footer';
import HeaderTopMenu from '../components/HeaderTopMenu/HeaderTopMenu';

const cx = classNames.bind(styles);

function DefaultLayout() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('fixed-header')}>
                <Header />
                <HeaderTopMenu />
            </div>
            <Body />
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
