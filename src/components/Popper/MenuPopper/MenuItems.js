import Button from "@/components/Button/Button";
import classNames from "classnames/bind";
import { Fragment } from "react";

import styles from './MenuItems.module.scss';
import SwitchBtn from '../../Button/Switch';


const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {

    return (
        <li className={cx("menu_items")} onClick={onClick} >
            <Button className={cx("non-df")} menuItem href="#" >

                <div className={cx("df")}>
                    <span className={data.icon ? cx("icon") : cx("dn")}>
                        {data.icon}
                    </span>
                    <span className={cx("menu-txt")}> {data.title}</span>
                </div>
                {data.classBtn ? <SwitchBtn /> : <Fragment />}
            </Button>
        </li>

    );
}

export default MenuItem;