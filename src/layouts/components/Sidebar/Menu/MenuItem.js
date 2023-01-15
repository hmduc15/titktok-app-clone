
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./Menu.module.scss"

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <div>
            <NavLink
                className={(nav) => cx("sidebar-link", { active: nav.isActive })}
                to={data.href}
            >
                {data.icon}
                <h2 className={cx("sidebar-link_text")}>{data.title}</h2>
            </NavLink>

        </div>
    );
}

export default MenuItem;