import { OPEN_MODAL, CLOSE_MODAL, SET_MODE } from "./constants";

const initState = {
    modal: { open: false, data: {} },
    heart: false,
    isDarkMode: true,
}


function reducer(state, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modal: {
                    open: action.isOpen,
                    data: action.payload
                }
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal: {
                    open: action.isOpen,
                    data: action.payload
                }
            }
        case SET_MODE:
            return {
                ...state,
                isDarkMode: action.payload
            }

        default:
            return 1;
    }

}

export { initState }
export default reducer;