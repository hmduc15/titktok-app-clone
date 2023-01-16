import React from "react";
import { CommentIcon, HeartIcon, ShareIcon } from "@/components/Icon/Icon";
import classNames from "classnames/bind";
import styles from "./BtnAction.module.scss";

const cx = classNames.bind(styles);

function ButtonAction({ data }) {
    return (
        <div className={cx("action-item_container")}>
            <button className={cx("btn-action")}>
                <span className={cx("action-icon")}>
                    <HeartIcon className="heart" />
                </span>
                <strong className={cx("strong-text")}>{data.likes_count}</strong>
            </button>
            <button className={cx("btn-action")}>
                <span className={cx("action-icon")}>
                    <CommentIcon />
                </span>
                <strong className={cx("strong-text")}>{data.comments_count}</strong>
            </button>
            <button className={cx("btn-action")}>
                <span className={cx("action-icon")}>
                    <ShareIcon />
                </span>
                <strong className={cx("strong-text")}>{data.shares_count}</strong>
            </button>
        </div>
    );
}

export default ButtonAction;