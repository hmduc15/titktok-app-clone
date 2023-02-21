/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Link } from "react-router-dom"
import classNames from "classnames/bind";
import { useEffect, useContext, memo } from "react";

import styles from "./BtnAction.module.scss";
import { CommentIcon, HeartIcon, ShareIcon } from "@/components/Icon/Icon";
import Context from "@/store/Context";
import { action } from "@/store";
import handleLikeVideo from "@/utils/like_request";

const cx = classNames.bind(styles);

function ButtonAction({ data }) {
    const [video, setVideo] = useState(data)
    const [state, dispatch] = useContext(Context);
    const [user, setUser] = useState(localStorage?.getItem('user'))


    useEffect(() => {
        setVideo(video);
    }, [video])

    const handleLike = async () => {
        const newData = await handleLikeVideo(video);
        setVideo((video) => ({
            ...video,
            ...newData,
        }))
    }

    return (
        <div className={cx("action-item_container")}>
            <button className={cx("btn-action")} >
                <span className={cx("action-icon")} onClick={
                    () => {
                        handleLike(video)
                    }
                }>
                    {video.is_liked ? <div className={cx("btn-animaction")}>
                        <lottie-player
                            autoplay
                            direction={2}
                            keepLastFrame={true}
                            mode="normal"
                            src="https://assets3.lottiefiles.com/packages/lf20_6z3m9mpw.json"
                            style={{ width: "65px" }}
                        >
                        </lottie-player>
                    </div> : <HeartIcon />}
                </span>
                <strong className={cx("strong-text")}>{video.likes_count}</strong>
            </button>
            {user ?
                <Link to={`/@${video.user.nickname}/video/${video.id}`}
                    state={{
                        data: video,
                        prevPath: location.pathname
                    }}
                >
                    <button className={cx("btn-action")}
                    >
                        <span className={cx("action-icon")}>
                            <CommentIcon />
                        </span>
                        <strong className={cx("strong-text")}>{video.comments_count}</strong>
                    </button>
                </Link>
                :
                <button className={cx("btn-action")}
                    onClick={() => {
                        dispatch(action.openLogin(true));
                        document.querySelector("body").classList.add(cx("hidden"))
                    }}
                >
                    <span className={cx("action-icon")}>
                        <CommentIcon />
                    </span>
                    <strong className={cx("strong-text")}>{video.comments_count}</strong>
                </button>
            }
            <button className={cx("btn-action")}>
                <span className={cx("action-icon")}>
                    <ShareIcon />
                </span>
                <strong className={cx("strong-text")}>{video.shares_count}</strong>
            </button>
        </div>
    );
}

export default memo(ButtonAction);