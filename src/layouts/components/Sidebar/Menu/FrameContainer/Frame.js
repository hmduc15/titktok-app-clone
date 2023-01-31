import React from 'react';
import classNames from 'classnames/bind';
import { useMatch } from 'react-router-dom';

import styles from './Frame.module.scss';

const cx = classNames.bind(styles);

function FrameContainer({ props }) {

    const match = useMatch('/:item');

    return (
        <div className={cx("frame-container")}>
            <p className={cx("login-hint")}>Log in to follow creator, like videos, and view comments</p>
            <button className={cx("btnNav_fullspace", {
                "btn-nav": match === null
            })} type="button">Log in</button>
        </div>
    );
}

export default FrameContainer;