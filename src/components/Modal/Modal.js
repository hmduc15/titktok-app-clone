import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import styles from "./Modal.module.scss";
import { CloseIcon } from "../Icon/Icon";
import Login from "./Content/Login";
import SignUp from "./Content/Signup";
import Context from "@/store/Context";
import { action } from "@/store";
import Loading from "../Loading/Loading";

const cx = classNames.bind(styles)

function Modal() {
    const [isLogin, setLogin] = useState(true);
    const handleChangeModal = () => {
        setLogin(!isLogin);
    }
    const [state, dispatch] = useContext(Context);

    return (
        <div className={cx("modal-container")}>
            <div className={cx("modal-mask")}>
                {state.isShowing && <Loading props={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />}
            </div>
            <div className={cx("modal-wrapper")}>
                <div className={cx("modal-content")} style={{ zIndex: state.isShowing ? -1 : null }} >
                    <div className={cx("modal-btn")} onClick={() => {
                        dispatch(action.closeLogin(false))
                        document.querySelector("body").classList.remove(cx("hidden"))
                    }}>
                        <CloseIcon />
                    </div>
                    {isLogin ? <Login /> : <SignUp />}
                    <div className={cx("login-bottom")}>
                        {isLogin ?
                            <> <p>Don't have  an account?</p>
                                <Link to="" onClick={handleChangeModal}>
                                    <p className={cx("link-text")}>Sign up</p>
                                </Link>
                            </> :
                            <>
                                <p>Already have an account?</p>
                                <Link to="" onClick={handleChangeModal}>
                                    <p className={cx("link-text")}> Login </p>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;