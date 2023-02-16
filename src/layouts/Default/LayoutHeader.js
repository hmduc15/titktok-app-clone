import React, { useContext, useEffect } from 'react'
import classNames from "classnames/bind";
import { useParams, useLocation } from 'react-router-dom';

import styles from "./LayoutDefault.module.scss"
import Header from "./Header/LayoutsHeader";
import Context from '@/store/Context';
import { action } from '@/store';

const cx = classNames.bind(styles);

function LayoutHeader({ children }) {
    return (
        <>
            <Header props="fullspace" layout="upload" />
            <div style={{ paddingTop: '80px', backgroundColor: 'rgb(248, 248, 248)' }} className={cx("Content", {})}>
                {children}
            </div>
        </>
    );
}

export default LayoutHeader;