import { CommingSoon } from "@/components/Icon/Icon";

function LivePage() {
    return (
        <div style={{ backgroundColor: '#17314b', height: '100vh' }}>
            <lottie-player
                autoplay
                direction={2}
                keepLastFrame={true}
                mode="normal"
                src="https://assets3.lottiefiles.com/packages/lf20_fgbjdipq.json"
                style={{ width: "600px", margin: '0 auto' }}
            >
            </lottie-player>
        </div>
    );
}

export default LivePage;