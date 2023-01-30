import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import classNames from "classnames/bind";
import "@lottiefiles/lottie-player";

import styles from "./BtnAction.module.scss";
import { CommentIcon, HeartIcon, ShareIcon } from "@/components/Icon/Icon";
const cx = classNames.bind(styles);

function ButtonAction({ data, isHeart }) {
    const [isLike, setLike] = useState(false);
    const navigate = useNavigate();
    const handleLike = () => {
        setLike(!isLike);
    }


    return (
        <div className={cx("action-item_container")}>
            <button className={cx("btn-action")} onClick={handleLike}>
                <span className={cx("action-icon")}>
                    {isLike || isHeart ? <div className={cx("btn-animaction")}>
                        <lottie-player
                            autoplay
                            direction={2}
                            keepLastFrame={true}
                            mode="normal"
                            src="https://assets3.lottiefiles.com/packages/lf20_6z3m9mpw.json"
                            style={{ width: "60px" }}
                        >
                        </lottie-player>
                    </div> : <HeartIcon />}
                </span>

                <strong className={cx("strong-text")}>{data.likes_count}</strong>
            </button>
            <button className={cx("btn-action")}>
                <span className={cx("action-icon")} onClick={() => {
                    navigate(`/@${data.user.nickname}/video/${data.id}`, { state: { data: data } })
                }}>
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