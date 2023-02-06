import React, { memo, useEffect } from 'react'
import classNames from "classnames/bind";
import { useState, useRef, useContext } from "react";

import styles from './SwitchButton.module.scss';
import Context from '@/store/Context';
import { action } from '@/store';
import { setMode } from '@/store/action';

const cx = classNames.bind(styles);

function SwitchBtn() {
    const [state, dispatch] = useContext(Context);
    const [isDarkMode, setDarkMode] = useState(state.isDarkMode);
    const switchRef = useRef();

    const handleSwitch = () => {
        setDarkMode(!isDarkMode);
        dispatch(action.setMode(!isDarkMode));
    }


    useEffect(() => {
        if (isDarkMode) {
            switchRef.current.classList.remove(cx("active"));
        } else {
            switchRef.current.classList.add(cx("active"))
        }
        localStorage.setItem("mode", isDarkMode ? "dark" : "light")
        document.documentElement.setAttribute('data-theme', localStorage.getItem("mode"));
    }, [isDarkMode]);

    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <button role="button" className={cx("btn-switch")} onClick={handleSwitch}>
            <div className={cx("switch-wrapper")}>
                <span ref={switchRef} className={cx("switch-icon")}></span>
            </div>
        </button>
    );
}

export default memo(SwitchBtn);