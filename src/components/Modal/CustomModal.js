import ReactModal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";
import { memo } from "react";
import { redirectModal } from "@/utils/common";

ReactModal.setAppElement("div");

const fullScreen = {
    ointerEvents: "none",
    overlay: { zIndex: 10 },
    zIndex: "10",
    position: "relative",
    content: {
        position: "fixed",
        position: "relative",
        inset: "0px",
        background: "#121212",
        zIndex: "10",
        display: "flex",
        flexDirection: "row",
    },
}

function CustomModal({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ReactModal
            isOpen={true}
            style={fullScreen}
            onRequestClose={() => {
                redirectModal(location, navigate);
            }}
        >
            {children}
        </ReactModal>
    );
}

export default memo(CustomModal);