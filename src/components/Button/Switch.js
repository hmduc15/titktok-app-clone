import classNames from "classnames/bind";
import { useState, useRef } from "react";

import styles from './SwitchButton.module.scss';

const cx = classNames.bind(styles);

function SwitchBtn() {
    const [state, setState] = useState('dark');
    const switchRef = useRef();
    const handleSwitch = () => {
        setState(state === 'dark' ? 'light' : 'dark');
        if (state === 'light') {
            switchRef.current.classList.add(cx("active"));
        } else {
            switchRef.current.classList.remove(cx("active"));
        }
    }

    return (
        <button className={cx("btn-switch")}>
            <div className={cx("switch-wrapper")}>
                <span ref={switchRef} onClick={handleSwitch} className={cx("switch-icon")}></span>
            </div>
        </button>
    );
}

export default SwitchBtn;