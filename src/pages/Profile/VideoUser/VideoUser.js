import React from 'react'
import classNames from "classnames/bind";

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
        <div className={cx("video-feed")}>
            {data.map((vid) => (
                <div key={vid.id} className={cx("container-video_item")}>
                    <div className={cx("video-item_main")}>
                        <video
                            muted
                            loop
                            className={cx("video", {
                                "video-big": vid.meta.video.resolution_y >= 480
                            })}
                            onMouseEnter={e => handlePlay(e.target)}
                            onMouseLeave={e => handlePause(e.target)}
                        >
                            <source type="video/mp4" src={vid.file_url} />
                        </video>
                    </div>
                    <div className={cx("btn-control")}></div>
                </div>
            ))}
        </div>

    );
}

export default VideoUser;