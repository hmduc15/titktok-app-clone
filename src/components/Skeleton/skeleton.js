import classNames from "classnames/bind";

import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

export default function SkeletonVid() {
    return (
        <div className={cx("skeleton-vid")}>
            <div className={cx("skeleton-avatar")}>
            </div>
            <div className={cx("skeleton-content")}>
                <div className={cx("skeleton-username")}></div>
                <div className={cx("skeleton-desc")}></div>
                <div className={cx("skeleton-music")}></div>
                <div className={cx("skeleton-vid_main")}></div>
            </div>
        </div>
    );
}
export function SkeletonUser() {
    return (
        <div className={cx("skeleton-vid")}>
            <div className={cx("skeleton-content")}>
                <div className={cx("skeleton-username")}></div>
                <div className={cx("skeleton-desc")}></div>
            </div>
        </div>
    );
}


