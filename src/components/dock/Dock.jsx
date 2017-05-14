import React from 'react';
import PropTypes from 'prop-types';

import './dock.css';

const Dock = ({
    apps,
    openApp,
    openedApps,
}) => (
    <div className="dock">
        {
            apps.map((app) => {
                const style = {
                    backgroundImage: `url(${app.icon})`,
                };

                const isOpened = openedApps.includes(app.appid);

                return (
                    <div // eslint-disable-line
                      key={app.displayName}
                      className={`appicon ${isOpened ? 'opened' : ''}`}
                      style={style}
                      onClick={() => {
                          openApp(app.appid);
                      }}
                    >
                        <i className="display-name">{ app.displayName }</i>
                    </div>
                );
            })
        }
    </div>
);

Dock.propTypes = {
    apps: PropTypes.arrayOf(PropTypes.any).isRequired,
    openApp: PropTypes.func.isRequired,
    openedApps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dock;
