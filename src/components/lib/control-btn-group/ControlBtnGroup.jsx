import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const ControlBtnGroup = ({
    onClose,
    onMin,
    onMax,
}) => (
    <div className="control-btn-wrap">
        {
            onClose ? (
                <a // eslint-disable-line
                  className="btn close-btn"
                  onClick={onClose}
                ></a>
            ) : ''
        }
        {
            onMin ? (
                <a // eslint-disable-line
                  className={`btn min-btn ${onMin === 'disabled' ? 'disabled' : ''}`}
                  onClick={onMin === 'disabled' ? undefined : onMin}
                ></a>
            ) : ''
        }
        {
            onMax ? (
                <a // eslint-disable-line
                  className="btn max-btn"
                  onClick={onMax}
                ></a>
            ) : ''
        }
    </div>
);

ControlBtnGroup.propTypes = {
    onClose: PropTypes.func,
    onMin: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    onMax: PropTypes.func,
};

ControlBtnGroup.defaultProps = {
    onClose: null,
    onMin: null,
    onMax: null,
};

export default ControlBtnGroup;
