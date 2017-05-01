import React from 'react';

import './dock.css';

import finder from '../app/finder/Finder';
import launchpad from '../app/launchpad/Launchpad';
import chrome from '../app/chrome/Chrome';
import iTerm from '../app/iTerm/ITerm';
import music from '../app/music/Music';
import firefox from '../app/firefox/Firefox';
import intro from '../app/intro/Intro';

/** required */
const apps = [
    intro,
    finder,
    launchpad,
    chrome,
    iTerm,
    music,
    firefox,
]

export default () => {
    return (
        <div className="dock">
            {
                apps.map((app) => {
                    const style = {
                        backgroundImage: `url(${app.icon})`
                    }

                    return (
                        <div
                            key={app.displayName}
                            className="appicon"
                            style={style}
                        >
                            <i className="display-name">{ app.displayName }</i>
                        </div>
                    )
                })
            }

        </div>
    )
}