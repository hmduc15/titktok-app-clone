import React from 'react'
import { HashTagIcon, MusicIcon } from "@/components/Icon/Icon";
import classNames from "classnames/bind";

import styles from '../Discover.module.scss';

const cx = classNames.bind(styles);


function LinkItem({ tag, music }) {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className={cx("link-item")} >
            <div className={cx("discover-item_container")}>
                {tag ? <HashTagIcon /> : <MusicIcon />}
                <p className={cx("discover-item_title")}>suthatla</p>
            </div>
        </a>
    );
}

export default LinkItem;