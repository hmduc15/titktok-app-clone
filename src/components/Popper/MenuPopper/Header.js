import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import styles from './MenuItems.module.scss';
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <div className={cx("header-menu")}>
            <button className={cx("btn-back")} onClick={onBack} >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <p className={cx("title")}>{title}</p>
        </div>
    );
}

export default Header;