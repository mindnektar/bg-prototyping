import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'atoms/Icon';

const ScoreTrack = (props) => {
    const renderItem = (index) => (
        <div
            key={index}
            className={classNames(
                'rev9-score-track__item',
                { 'rev9-score-track__item--highlighted': index % 5 === 0 },
            )}
        >
            <Icon type="vp" context="rev9" />

            {index}
        </div>
    );

    return (
        <div className="rev9-score-track">
            <div className="rev9-score-track__top">
                {Array(16).fill(null).map((_, index) => (
                    renderItem(index)
                ))}
            </div>

            <div className="rev9-score-track__center">
                <div className="rev9-score-track__left">
                    {Array(34).fill(null).map((_, index) => (
                        renderItem(index + 66)
                    ))}
                </div>

                <div className="rev9-score-track__content">
                    {props.children}
                </div>

                <div className="rev9-score-track__right">
                    {Array(34).fill(null).map((_, index) => (
                        renderItem(index + 16)
                    ))}
                </div>
            </div>

            <div className="rev9-score-track__bottom">
                {Array(16).fill(null).map((_, index) => (
                    renderItem(index + 50)
                ))}
            </div>
        </div>
    );
};

ScoreTrack.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ScoreTrack;
