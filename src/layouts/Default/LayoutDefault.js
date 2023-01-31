import React from 'react'
import classNames from "classnames/bind";
import { useMatch } from 'react-router-dom';

import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";
import SideBar from "@/layouts/components/Sidebar/Sidebar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const match = useMatch('/:item');
    console.log(match === null);

    return (
        <>
            <Header props={children.type.name} />
            <div className={cx("Content")} style={{ paddingTop: 60 }}>
                <div className={cx("Body-container_fullspace", {
                    "Body-container": match === null
                })} >
                    <SideBar props={children.type.name} />
                    <div className={cx("Content-fullspace", {
                        "Content": match === null
                    })}>{children}</div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;