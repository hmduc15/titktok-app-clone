import React, { useEffect } from 'react'
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading/Loading';

import Skeleton from "../Skeleton/skeleton";
import styles from './VideoContainer.module.scss';
import VideoItem from "./VideoItem/VideoItem";

const cx = classNames.bind(styles);

function VideoContainer() {
    const eleRef = useRef();
    const [dataVids, setDataVid] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${page}`)
            .then(res => res.json())
            .then((res) => {
                setDataVid([...dataVids, ...res.data]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    return (
        <div ref={eleRef} className={cx("video-main_container")}>
            {
                loading ? <Skeleton /> :
                    <InfiniteScroll
                        dataLength={dataVids.length}
                        next={() => setTimeout(() => { setPage(prev => prev + 1) }, 2500)}
                        hasMore={true}
                        loader={<Loading />}
                    >
                        {(
                            dataVids.map((dataVid, index) => (
                                <VideoItem data={dataVid} key={index} />
                            ))
                        )}
                    </InfiniteScroll>
            }
        </div>
    );
}

export default VideoContainer;