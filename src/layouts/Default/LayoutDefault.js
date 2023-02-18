import React, { useContext } from 'react'
import classNames from "classnames/bind";

import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";
import SideBar from "@/layouts/components/Sidebar/Sidebar";
import Context from '@/store/Context';
import Modal from '@/components/Modal/Modal';
import VideoPage from '@/components/Video/VideoView/VideoView'


const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [state, dispatch] = useContext(Context);

    return (
        <>
            <Header props={children.type.name} />
            <div className={cx("Content")} style={{ paddingTop: 60 }}>
                <div className={cx("Body-container", {

                })} >
                    <SideBar props={children.type.name} />
                    <div className={cx("Content", {

                    })}>{children}
                    </div>
                </div>
            </div>
            {state.modalLogin && <Modal />}
        </>
    );
}

export default DefaultLayout;