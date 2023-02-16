import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import CommentItem from "./CommentItem/CommentItem";
import { handleComment } from "@/pages/Video/Service/handleComment";
import { SkeletonUser } from "../Skeleton/skeleton";
import styles from ".//CommentItem/Comment.module.scss";


const cx = classNames.bind(styles);



function CommentList({ data }) {
    const [listComments, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const commentList = async (data) => {
            try {
                const res = await handleComment.getComments(data.id);
                setLoading(false);
                setList(res);
            } catch (err) { console.log(err) }
        }
        commentList(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id]);

    return (
        <>
            {isLoading ? <SkeletonUser /> : listComments.map((list, index) => (
                <CommentItem key={index} comment={list} />
            ))}
            {listComments.length === 0 && !isLoading && <p className={cx("empty-comments")}>Be the first comment</p>}
        </>
    );
}

export default CommentList;