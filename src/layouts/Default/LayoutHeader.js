import React from 'react'
import classNames from "classnames/bind";

import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";


const cx = classNames.bind(styles);

function LayoutHeader({ children }) {
    document.documentElement.setAttribute('data-theme', 'light');
    return (
        <>
            <Header props="fullspace" />
            <div style={{ paddingTop: '80px', backgroundColor: 'rgb(248, 248, 248)' }} className={cx("Content", {})}>
                {children}
            </div>
        </>
    );
}

export default LayoutHeader;