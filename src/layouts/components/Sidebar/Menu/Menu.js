import React from 'react'
import { FollowIcon, HomeIcon, LiveIcon } from '@/components/Icon/Icon';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';

import styles from './Menu.module.scss'
import { useEffect, useState } from 'react';
import config from '@/config';
import FrameContainer from './FrameContainer/Frame';

const cx = classNames.bind(styles);

const ListMenu = [
    {
        title: "For You",
        href: config.routes.foryou,
        icon: <HomeIcon />
    }, {
        title: "Following",
        href: config.routes.following,
        icon: <FollowIcon />
    }, {
        title: "LIVE",
        href: config.routes.live,
        icon: <LiveIcon />
    }
]

function Menu({ props }) {
    const isUser = localStorage.hasOwnProperty('currentUser');
    const [user, setUser] = useState(isUser);
    useEffect(() => {
        setUser(isUser);
    }, [isUser])

    return (
        <div className={cx("main-nav")}>
            {ListMenu.map((item, index) => (
                <MenuItem key={index}
                    data={item} />
            ))}
            {!user && <FrameContainer props={props} />}
        </div>
    );
}

export default Menu;