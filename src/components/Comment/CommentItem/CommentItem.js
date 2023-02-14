import Image from "@/components/Image";
import classNames from "classnames/bind";

import styles from './Comment.module.scss';
import src from "@/assets/images/avatar_user.png";
import { HeartIcon } from "@/components/Icon/Icon";

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
    const name = comment.user.first_name + comment.user.last_name || comment.user.nickname;

    return (
        <div className={cx("comment-item")}>
            <div className={cx("avatar-user")}>
                <Image src={comment.user.avatar} />
            </div>
            <div className={cx("comment-content")}>
                <span className={cx("comment-username")}>{name}</span>
                <p className={cx("comment-text")}>{comment.comment}</p>
                <div className={cx("comment-time")}>
                    <span>{comment.created_at}</span>
                </div>
            </div>
            <div className={cx("action")}>
                <HeartIcon />
            </div>
        </div>
    );
}

export default CommentItem;