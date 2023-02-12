
import { NOTICE_ERROR, OPEN_MODAL } from "./constants"
import { CLOSE_MODAL } from "./constants"
import { SET_MODE } from "./constants"
import { OPEN_LOGIN } from "./constants"
import { CLOSE_LOGIN } from "./constants"
import { SET_USER } from "./constants"

export const openModal = (payload, isOpen) => ({
    type: OPEN_MODAL,
    payload,
    isOpen
})
export const closeModal = (payload, isOpen) => ({
    type: CLOSE_MODAL,
    payload,
    isOpen
})
export const setMode = (payload) => ({
    type: SET_MODE,
    payload
})
export const openLogin = (isOpen) => ({
    type: OPEN_LOGIN,
    isOpen
})

export const closeLogin = (isOpen) => ({
    type: CLOSE_LOGIN,
    isOpen
})

export const Show = (payload) => ({
    type: NOTICE_ERROR,
    payload
})
export const setUser = (payload) => ({
    type: SET_USER,
    payload
})
