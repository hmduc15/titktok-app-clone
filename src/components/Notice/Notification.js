import classNames from "classnames/bind";

import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);

function Notification({ children }) {
    return (
        <div className={cx("notification-wrapper")} >
            <p className={cx("content")}> {children}</p>
        </div>
    );
}

export default Notification;