import React, { useEffect } from 'react'
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import Skeleton from "../Skeleton/skeleton";

import styles from './VideoContainer.module.scss';
import VideoItem from "./VideoItem/VideoItem";

const cx = classNames.bind(styles);

function VideoContainer() {
    const eleRef = useRef();
    const [dataVids, setDataVid] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=2')
            .then(res => res.json())
            .then((res) => {
                setDataVid(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <div ref={eleRef} className={cx("video-main_container")}>
            {
                loading ? <Skeleton /> : (
                    dataVids.map((dataVid) => (
                        <VideoItem data={dataVid} key={dataVid.id} />
                    ))
                )
            }
        </div>
    );
}

export default VideoContainer;