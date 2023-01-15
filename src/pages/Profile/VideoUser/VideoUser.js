import classNames from "classnames/bind";

import styles from "./VideoUser.module.scss";

const cx = classNames.bind(styles);

function VideoUser({ data }) {
    return (
        <div className={cx("video-feed")}>
            {data.map((video) => (
                <div key={video.id} className={cx("container-video_item")}>
                    <div className={cx("video-item_main")}>
                        <video
                            muted
                            loop
                            className={cx("video")}
                        >
                            <source type="video/mp4" src={video.file_url} />
                        </video>
                    </div>
                    <div className={cx("btn-control")}></div>
                </div>
            ))}
        </div>

    );
}

export default VideoUser;