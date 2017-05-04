import React from 'react';

import './style.css';

export default ({
    onClose,
    onMin,
    onMax,
}) => {
    return (
        <div className="control-btn-wrap">
            {
                onClose ? (
                    <a className="btn close-btn" onClick={onClose}></a>
                ) : ''
            }
            {
                onMin ? (
                    <a className="btn min-btn" onClick={onMin}></a>
                ) : ''
            }
            {
                onMax ? (
                    <a className="btn max-btn" onClick={onMax}></a>
                ) : ''
            }
        </div>
    );
};

