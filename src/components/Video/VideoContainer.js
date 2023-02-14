import React, { useEffect, memo } from 'react'
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading/Loading';

import Skeleton from "../Skeleton/skeleton";
import styles from './VideoContainer.module.scss';
import VideoItem from "./VideoItem/VideoItem";
import Provider from '@/store/Provider';
import { getUserService } from '@/utils/request';

const cx = classNames.bind(styles);

function VideoContainer({ props }) {
    const eleRef = useRef();
    const [dataVids, setDataVid] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [type, setType] = useState(props.title)

    useEffect(() => {
        setType(type);
    }, [type])

    useEffect(() => {
        const listVideo = async (type, page) => {
            try {
                const res = await getUserService.getListVideo(type, page);
                setDataVid([...dataVids, ...res.data]);
                setLoading(false);

            } catch (err) {
                console.log(err);
            }
        }
        listVideo(type, page)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, type])
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

export default memo(VideoContainer);