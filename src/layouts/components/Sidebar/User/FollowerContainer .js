import React, { Fragment } from 'react'
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


import styles from "./User.module.scss";
import UserLink from "./UserLink";
import { SkeletonUser } from "@/components/Skeleton/skeleton";
import { getUserService } from '@/utils/request';


const cx = classNames.bind(styles);


function FollowerContainer({ title }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);
    const [isSeeMore, setSeeMore] = useState(false);
    useEffect(() => {
        const getFollowers = async () => {
            try {
                const user = await getUserService.get('me/followings?page=1')
                setData(user.data);
            } catch (err) {
                console.log(err);
            }
        }
        getFollowers();
    }, [])


    const handleSeeMore = () => {
        setSeeMore(!isSeeMore);
    }
    useEffect(() => {
        isSeeMore ? setPage(page + 1) : setData(data.splice(0, 4))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSeeMore]);


    return (
        <>
            {data.length > 0 ? <div className={cx("user-container")}>
                <p className={cx("p-title")}>{title}</p>
                {
                    data.map((item, index) => {
                        return <UserLink key={index} data={item} title={title} />
                    })
                }
                <p onClick={handleSeeMore} className={cx("see-all")}>
                    {isSeeMore ? 'See less' : 'See more'}
                </p>
            </div> : <Fragment />}
        </>
    );
}
FollowerContainer.propTypes = {
    title: PropTypes.string.isRequired
}

export default FollowerContainer;