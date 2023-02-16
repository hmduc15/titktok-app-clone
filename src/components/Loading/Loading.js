import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

function Loading({ props }) {
    return (
        <div className={cx("container_loading")} style={props}>
            <div className={cx("loader")}></div>
        </div>
    );
}

export default Loading;