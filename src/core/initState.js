/* apps */
import Finder from '../components/app/finder/manifest';
import Launchpad from '../components/launchpad/manifest';
import Chrome from '../components/app/chrome/manifest';
import ITerm from '../components/app/iTerm/manifest';
import Music from '../components/app/music/manifest';
import Firefox from '../components/app/firefox/manifest';
import Intro from '../components/app/intro/manifest';
import ColorPicker from '../components/app/colorpicker/manifest';
import Photo from '../components/app/photo/manifest';
import Wechat from '../components/app/wechat/manifest';

export default {
    dockApps: [
        Intro,
        Launchpad,
        Wechat,
        Music,
        ITerm,
        ColorPicker,
    ],
    allApps: [
        Intro,
        Finder,
        Photo,
        Chrome,
        Firefox,
        ITerm,
        Music,
        ColorPicker,
        Wechat,
    ],
    notifications: [],
};
