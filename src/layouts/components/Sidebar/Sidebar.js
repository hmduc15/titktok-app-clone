import React from 'react'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import Discover from './Discover/Discover';
import Menu from './Menu/Menu';
import firebase from "@/services/firebase";
import styles from './Sidebar.module.scss'
import UserContainer from './User/UserContainer';

const cx = classNames.bind(styles);
function SideBar({ props }) {
    const [user, setUser] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(true);
            }
        })
    }, [user]);

    return (
        <div className={cx("fullspace", {
            "sidenav": props !== "fullspace"
        })}>
            <div className={cx("fullspace", {
                "sidenav-container": props !== "fullspace"
            })}>
                <div className={cx("scroll-container")}>
                    <div className={cx("wrapper")}>
                        <Menu props={props} />
                        <UserContainer title={"Suggested accounts"} />
                        {user && <UserContainer title={"Following accounts"} />}
                        <Discover />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;