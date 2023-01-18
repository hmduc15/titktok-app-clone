import config from '@/config';
import Home from '@/pages/Home';
import Following from '@/pages/Following';
import ProfilePage from '@/pages/Profile/Profile';
import UploadPage from '@/pages/Upload';
import VideoPage from '@/pages/Video/VideoView';


export const publicRoutes = [
    { path: config.routes.home, component: Home, },
    { path: config.routes.following, component: Following, },
    { path: config.routes.profile, component: ProfilePage, },
    { path: config.routes.upload, component: UploadPage, Layout: null },
    { path: config.routes.video, component: VideoPage, Layout: null },
    { path: config.routes.foryou, component: Home, }
]


export const privateRoutes = [
    { path: config.routes.forYou, component: Home, },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: ProfilePage },
    { path: config.routes.upload, component: UploadPage, Layout: null },
]