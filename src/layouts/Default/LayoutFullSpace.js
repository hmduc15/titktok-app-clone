import React from 'react'
import classNames from "classnames/bind";
import { useMatch, useLocation } from 'react-router-dom';

import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";
import SideBar from "@/layouts/components/Sidebar/Sidebar";
import VideoPage from '@/pages/Video/VideoView';

const cx = classNames.bind(styles);

function LayoutFullspace({ children }) {
    return (
        <>
            <Header props="fullspace" />
            <div className={cx("Content")} style={{ paddingTop: 60 }}>
                <div className={cx("Body-container_fullspace", {
                })} >
                    <SideBar props="fullspace" />
                    <div className={cx("Content-fullspace", {
                    })}>
                        {children}
                    </div>
                </div>
            </div>

        </>
    );
}

export default LayoutFullspace;