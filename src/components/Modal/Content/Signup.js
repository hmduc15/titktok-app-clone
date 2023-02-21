import { useState } from "react";
import classNames from "classnames/bind";

import styles from "../Modal.module.scss";
import { UserIcon, FacebookIcon, GoogleIcon, TwitterIcon, BackIcon } from "@/components/Icon/Icon";
import Form from "../../Form/FormSignUp";
import FormSignUp from "../../Form/FormSignUp";

const cx = classNames.bind(styles)

function SignUp() {
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {isOpen &&
                <div className={cx("btn-back")} role="button" onClick={handleClose}>
                    <BackIcon />
                </div>}
            <div className={cx("page-wrapper")}>
                <div className={cx("login-container")}>
                    {!isOpen ? <div className={cx("login-home")}>
                        <h2 className={cx("title")}>Sign Up for TikTok</h2>
                        <div className={cx("login-item")} onClick={handleOpen}>
                            <div className={cx("icon")}>
                                <UserIcon />
                            </div>
                            <p>Use phone or email</p>
                        </div>
                        <div className={cx("login-item")}>
                            <div className={cx("icon")}>
                                <FacebookIcon />
                            </div>
                            <p>Continue with Facebook</p>
                        </div>
                        <div className={cx("login-item")}>
                            <div className={cx("icon")}>
                                <GoogleIcon />
                            </div>
                            <p>Continue with Google</p>
                        </div>
                        <div className={cx("login-item")}>
                            <div className={cx("icon")}>
                                <TwitterIcon />
                            </div>
                            <p>Continue with Twitter</p>
                        </div>
                    </div> : <FormSignUp >Sign Up</FormSignUp>}
                </div>
            </div>
        </>
    );
}

export default SignUp;