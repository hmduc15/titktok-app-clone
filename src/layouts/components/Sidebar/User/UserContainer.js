import React from 'react'
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


import styles from "./User.module.scss";
import UserLink from "./UserLink";
import { SkeletonUser } from "@/components/Skeleton/skeleton";


const cx = classNames.bind(styles);


function UserContainer({ title }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);
    const [isSeeMore, setSeeMore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://tiktok.fullstack.edu.vn/api/users/suggested?page=${page}&per_page=5`)
            .then(res => res.json())
            .then((res) => {
                setData(prevUser => [...prevUser, ...res.data]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [page]);
    const handleSeeMore = () => {
        setSeeMore(!isSeeMore);
    }
    useEffect(() => {
        isSeeMore ? setPage(page + 1) : setData(data.splice(0, 4))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSeeMore]);



    return (
        <>
            {loading ?
                <SkeletonUser style={{ marginBottom: "10px" }} /> :
                (<div className={cx("user-container")}>
                    <p className={cx("p-title")}>{title}</p>
                    {
                        data.map((item, index) => {
                            return <UserLink key={index} data={item} title={title}
                                onClick={() => {
                                    console.log("f");
                                }}
                            />
                        })
                    }
                    <p onClick={handleSeeMore} className={cx("see-all")}>
                        {isSeeMore ? 'See less' : 'See more'}
                    </p>
                </div>)}
        </>
    );
}
UserContainer.propTypes = {
    title: PropTypes.string.isRequired
}

export default UserContainer;