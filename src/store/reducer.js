
import { OPEN_MODAL, CLOSE_MODAL, SET_MODE, OPEN_LOGIN, CLOSE_LOGIN, NOTICE_ERROR, SET_USER } from "./constants";

const initState = {
    viewVideo: { open: false, data: {} },
    heart: false,
    isDarkMode: true,
    modalLogin: false,
    isShowing: false,
    user: null
}



function reducer(state, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                viewVideo: {
                    open: action.isOpen,
                    data: action.payload
                }
            }
        case CLOSE_MODAL:
            return {
                ...state,

                viewVideo: {
                    open: action.isOpen,
                    data: action.payload
                }
            }
        case SET_MODE:
            return {
                ...state,
                isDarkMode: action.payload
            }
        case OPEN_LOGIN:
            return {
                ...state,
                modalLogin: action.isOpen
            }
        case CLOSE_LOGIN:
            return {
                ...state,
                modalLogin: action.isOpen
            }
        case NOTICE_ERROR:
            return {
                ...state,
                isShowing: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return 1;
    }

}

export { initState }
export default reducer;