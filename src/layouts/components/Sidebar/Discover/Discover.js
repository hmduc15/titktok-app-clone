import classNames from "classnames/bind";

import styles from './Discover.module.scss';
import LinkItem from "./Item/LinkItem";

const cx = classNames.bind(styles);

function Discover() {
    return (
        <div className={cx("discover-container")}>
            <p className={cx("discover-title")}>Discover</p>
            <div className={cx("discover-list")}>
                <LinkItem tag />
                <LinkItem music />
                <LinkItem music />
                <LinkItem music />
                <LinkItem music />
            </div>
        </div>
    );
}

export default Discover;