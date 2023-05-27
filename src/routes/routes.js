import config from '~/config';

// Pages
import Home from '~/Pages/Home';
import Login from '~/Pages/Login/index';
import SignIn from '~/Pages/SignIn/SignIn';
import Album from '~/Pages/Album/Album';
import Video from '~/Pages/Video/Video';
import HotList from '~/Pages/HotList/HotList';
import Artist from '~/Pages/Artist/Artist';
import PlayerPage from '~/Pages/PlayerPage/PlayerPage';
import Artists from '~/Pages/Artists/Artists';
import AlbumPage from '~/Pages/AlbumPage/AlbumPage';

// Public Routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.signin, component: SignIn, layout: null },
    { path: config.routes.album, component: Album, layout: null },
    { path: config.routes.video, component: Video, layout: null },
    { path: config.routes.hotlist, component: HotList, layout: null },
    { path: config.routes.artist, component: Artist, layout: null },
    { path: config.routes.player, component: PlayerPage, layout: null },
    { path: config.routes.artists, component: Artists, layout: null },
    { path: config.routes.albums, component: AlbumPage, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
