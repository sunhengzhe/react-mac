/* apps */
import Finder from '../components/app/finder/manifest';
import Launchpad from '../components/app/launchpad/manifest';
import Chrome from '../components/app/chrome/manifest';
import ITerm from '../components/app/iTerm/manifest';
import Music from '../components/app/music/manifest';
import Firefox from '../components/app/firefox/manifest';
import Intro from '../components/app/intro/manifest';
import ColorPicker from '../components/app/colorpicker/manifest';
import Photo from '../components/app/photo/manifest';

export default {
    dockApps: [
        Intro,
        Launchpad,
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
    ],
    notifications: []
};
