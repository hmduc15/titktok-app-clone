import React, { useEffect } from 'react'
import classNames from "classnames/bind";
import { useState, useRef } from "react";

import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

function SwitchBtn() {
    const [isLight, setLight] = useState(false);
    const switchRef = useRef();
    const handleSwitch = () => {
        setLight(!isLight);

    }
    useEffect(() => {
        if (isLight) {
            switchRef.current.classList.add(cx("active"))
        } else {
            switchRef.current.classList.remove(cx("active"));
        }
        localStorage.setItem("mode", isLight ? "light" : "dark")
        document.documentElement.setAttribute('data-theme', localStorage.getItem("mode"));
    }, [isLight]);

    return (
        <div className={cx("btn-switch")} onClick={handleSwitch}>
            <div className={cx("switch-wrapper")}>
                <span ref={switchRef} className={cx("switch-icon")}></span>
            </div>
        </div>
    );
}

export default SwitchBtn;