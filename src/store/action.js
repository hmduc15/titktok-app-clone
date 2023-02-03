import { OPEN_MODAL } from "./constants"
import { CLOSE_MODAL } from "./constants"

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