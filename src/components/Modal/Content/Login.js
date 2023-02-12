import classNames from "classnames/bind";
import { useState } from "react";


import styles from "../Modal.module.scss";
import { QrIcon, UserIcon, FacebookIcon, GoogleIcon, TwitterIcon, BackIcon } from "@/components/Icon/Icon";
import FormLogIn from "./Form/FormLogIn";

const cx = classNames.bind(styles)

function Login() {
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
                        <h2 className={cx("title")}>Log in to TikTok</h2>
                        <div className={cx("login-item")} onClick={handleOpen}>
                            <div className={cx("icon")}>
                                <UserIcon />
                            </div>
                            <p>Use phone / email / username</p>
                        </div>
                        <div className={cx("login-item")}>
                            <div className={cx("icon")}>
                                <QrIcon />
                            </div>
                            <p>Use QR code</p>
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
                    </div> : <FormLogIn>Log in </FormLogIn>}
                </div>
            </div>
        </>
    );
}

export default Login;