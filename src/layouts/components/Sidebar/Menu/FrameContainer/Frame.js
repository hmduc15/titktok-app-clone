import React from 'react';
import classNames from 'classnames/bind';

import styles from './Frame.module.scss';

const cx = classNames.bind(styles);

function FrameContainer({ props }) {
    return (
        <div className={cx("frame-container")}>
            <p className={cx("login-hint")}>Log in to follow creator, like videos, and view comments</p>
            <button className={cx("btn-nav", {
                "btnNav_fullsapce": props === "ProfilePage"
            })} type="button">Log in</button>
        </div>
    );
}

export default FrameContainer;