import React, { useContext, useEffect, useState } from 'react'
import classNames from "classnames/bind";

import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";
import SideBar from "@/layouts/components/Sidebar/Sidebar";
import Context from '@/store/Context';
import { action } from '@/store';
import VideoPage from '@/pages/Video/VideoView';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [state, dispatch] = useContext(Context);

    return (
        <>
            {state.modal.open && (<div className={cx("modal_video")}>
                <VideoPage data={state.modal.data} />
            </div>)}
            <Header props={children.type.name} />
            <div className={cx("Content")} style={{ paddingTop: 60 }}>
                <div className={cx("Body-container", {

                })} >
                    <SideBar props={children.type.name} />
                    <div className={cx("Content", {

                    })}>{children}</div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;