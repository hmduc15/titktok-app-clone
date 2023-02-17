import React, { memo, useEffect } from 'react'
import classNames from "classnames/bind";
import { useState, useRef, useContext } from "react";
import { useMatch, useLocation } from 'react-router-dom';

import styles from './SwitchButton.module.scss';
import Context from '@/store/Context';
import { action } from '@/store';
import { setMode } from '@/store/action';

const cx = classNames.bind(styles);

function SwitchBtn() {
    const [state, dispatch] = useContext(Context);
    const [isDarkMode, setDarkMode] = useState(state.isDarkMode);
    const switchRef = useRef();
    const location = useLocation();


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkMode]);

    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <div role="button" className={cx("btn-switch")} onClick={handleSwitch}>
            <div className={cx("switch-wrapper")}>
                <span ref={switchRef} className={cx("switch-icon")}></span>
            </div>
        </div>
    );
}

export default memo(SwitchBtn);