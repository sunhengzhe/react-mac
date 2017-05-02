import React from 'react';
import PropTypes from 'prop-types';

import './dock.css';

const Dock = ({
    apps,
    openApp,
    openedApps
}) => {
    return (
        <div className="dock">
            {
                apps.map((app) => {
                    const style = {
                        backgroundImage: `url(${app.icon})`
                    };

                    let isOpened = openedApps.includes(app.appid);

                    return (
                        <div
                            key={app.displayName}
                            className={`appicon ${isOpened ? 'opened' : ''}`}
                            style={style}
                            onClick={() => {
                                openApp(app.appid);
                            }}
                        >
                            <i className="display-name">{ app.displayName }</i>
                        </div>
                    )
                })
            }
        </div>
    )
};

Dock.propTypes = {
    apps: PropTypes.array,
    openApp: PropTypes.func,
}

export default Dock;