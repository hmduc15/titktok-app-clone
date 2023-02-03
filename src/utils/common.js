export const redirectModal = (location, navigate) => {
    if (location.state.prevPath) {
        return navigate(-1);
    } else navigate("/");
};