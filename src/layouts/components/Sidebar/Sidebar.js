import React from 'react'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import Discover from './Discover/Discover';
import Menu from './Menu/Menu';
import firebase from "@/services/firebase";
import styles from './Sidebar.module.scss'
import UserContainer from './User/UserContainer';
import FollowerContainer from './User/FollowerContainer ';

const cx = classNames.bind(styles);
function SideBar({ props }) {
    const [user, setUser] = useState();
    const currentUser = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).data : null;
    useEffect(() => {
        const updateUser = () => {
            setUser(currentUser)
        }
        setTimeout(() => {
            updateUser();
        }, 2700)
    }, [])


    return (
        <div className={cx("sidenav", {
            "fullspace": props === "fullspace"
        })}>
            <div className={cx("sidenav-container", {
                "fullspace": props === "fullspace"
            })}>
                <div className={cx("scroll-container")}>
                    <div className={cx("wrapper")}>
                        <Menu props={props} />
                        <UserContainer title={"Suggested accounts"} />
                        {user && <FollowerContainer title={"Following accounts"} />}
                        <Discover />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;