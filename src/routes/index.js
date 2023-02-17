import config from '@/config';
import Home from '@/pages/Home';
import FollowPage from '@/pages/Following';
import ProfilePage from '@/pages/Profile/Profile';
import UploadPage from '@/pages/Upload/UploadPage';
import VideoDetail from '@/pages/Video/Videodetail';
import LayoutFullspace from '@/layouts/Default/LayoutFullSpace';
import LayoutHeader from '@/layouts/Default/LayoutHeader';
import LivePage from '@/pages/Live/Live';


export const publicRoutes = [
    { path: config.routes.home, component: Home, },
    { path: config.routes.following, component: FollowPage, },
    { path: config.routes.profile, component: ProfilePage, Layout: LayoutFullspace },
    { path: config.routes.upload, component: UploadPage, Layout: LayoutHeader },
    { path: config.routes.video, component: VideoDetail, Layout: null },
    { path: config.routes.foryou, component: Home, },
    { path: config.routes.live, component: LivePage, Layout: null }
]


export const privateRoutes = [
    { path: config.routes.forYou, component: Home, },
    { path: config.routes.following, component: FollowPage },
    { path: config.routes.profile, component: ProfilePage },
    { path: config.routes.upload, component: UploadPage, Layout: null },
]