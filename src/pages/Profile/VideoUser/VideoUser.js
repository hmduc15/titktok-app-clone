/* eslint-disable no-restricted-globals */
import React from 'react'
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';

import styles from "./VideoUser.module.scss";

const cx = classNames.bind(styles);

function VideoUser({ data }) {
    const handlePlay = (e) => {
        e.play();
    }
    const handlePause = (e) => {
        e.currentTime = 0;
        e.pause();
    }

    return (
        <>
            {data.map((item, index) => (

                <div className={cx("video-feed")}>
                    <div className={cx("container-video_item")}>
                        <div className={cx("video-item_main")}>
                            <Link key={index} to={`/@${item.user.nickname}/video/${item.id}`}
                                state={{
                                    data: item,
                                    prevPath: location.pathname
                                }}
                            >
                                <video
                                    muted
                                    loop
                                    className={cx("video", {
                                        "video-big": item.meta.video.resolution_y >= 480
                                    })}
                                    onMouseEnter={e => handlePlay(e.target)}
                                    onMouseLeave={e => handlePause(e.target)}
                                >
                                    <source type="video/mp4" src={item.file_url} />
                                </video>
                            </Link>
                        </div>
                        <div className={cx("btn-control")}></div>
                    </div>

                </div>
            ))}
        </>
    )
}

export default VideoUser;