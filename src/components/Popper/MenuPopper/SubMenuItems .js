import classNames from "classnames/bind";

import styles from './SubMenuItems.module.scss';


const cx = classNames.bind(styles);


function SubMenuItems({ data }) {
    return (
        <>
            <li className={cx("menu-item")}>
                <a className={cx("menu-item_link")} href="/">
                    <span className={cx("menu-txt")}>{data}</span>
                </a>
            </li>
        </>
    );
}

export default SubMenuItems;