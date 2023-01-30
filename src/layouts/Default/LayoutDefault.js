import React from 'react'
import classNames from "classnames/bind";
import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";
import SideBar from "@/layouts/components/Sidebar/Sidebar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    console.log(children);
    return (
        <>
            <Header props={children.type.name} />
            <div className={cx("Content")} style={{ paddingTop: 60 }}>
                <div className={cx("Body-container", {
                    "Body-container_fullspace": children.type.name === "ProfilePage"
                })} >
                    <SideBar props={children.type.name} />
                    <div className={cx("Content", {
                        "Content-fullspace": children.type.name === "ProfilePage"
                    })}>{children}</div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;