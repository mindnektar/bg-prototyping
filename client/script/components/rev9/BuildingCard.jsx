import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'atoms/Icon';
import Resource from './Resource';
import VP from './VP';
import Gold from './Gold';

const colors = { fabric: '#a9d283', wood: '#5a8236', wheat: '#e8df6f', stone: '#898b90' };

const bonusMap = (bonus) => {
    const [type, level] = bonus.split('-');

    switch (type) {
        case 'gold':
            return <Gold value={parseInt(level, 10)} />;

        case 'vp':
            return <VP value={parseInt(level, 10)} />;

        case 'diamond':
            return (
                <img
                    alt=""
                    src="/images/rev9/icons/diamond.svg"
                />
            );

        case 'fabric':
        case 'wood':
        case 'wheat':
        case 'stone':
        case 'wild':
            return <Resource type={type} level={parseInt(level, 10)} />;

        default:
            return null;
    }
};

const BuildingCard = (props) => (
    <div
        className={classNames(
            'rev9-building-card',
            `rev9-building-card--${props.type}`,
        )}
        style={{ backgroundColor: colors[props.type] }}
    >
        <div className="rev9-building-card__skill">
            <div className="rev9-building-card__condition">
                {props.skill.condition}
            </div>

            <div className="rev9-building-card__text">
                {props.skill.text}
            </div>
        </div>

        <div className="rev9-building-card__middle">
            <div className="rev9-building-card__cost">
                {props.cost.map((cost, inputIndex) => (
                    <Resource
                        key={inputIndex}
                        type={cost.split('-')[0]}
                        level={parseInt(cost.split('-')[1], 10)}
                    />
                ))}
            </div>

            <div className="rev9-building-card__neutral">
                {props.neutral.map((bonus, index) => (
                    <React.Fragment key={index}>
                        {bonusMap(bonus)}
                    </React.Fragment>
                ))}
            </div>
        </div>

        <div className="rev9-building-card__production">
            {props.production.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <div className="rev9-building-card__production-item-separator" />
                    )}

                    <div className="rev9-building-card__production-item">
                        <div className="rev9-building-card__production-input">
                            {item.input.map((input, inputIndex) => (
                                <React.Fragment key={inputIndex}>
                                    {bonusMap(input)}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="rev9-building-card__production-item-arrow">
                            <Icon type="chevron" context="rev9" />
                        </div>

                        <div className="rev9-building-card__production-output">
                            {item.output.map((output, outputIndex) => (
                                <React.Fragment key={outputIndex}>
                                    {bonusMap(output)}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    </div>
);

BuildingCard.propTypes = {
    type: PropTypes.string.isRequired,
    cost: PropTypes.array.isRequired,
    skill: PropTypes.object.isRequired,
    neutral: PropTypes.array.isRequired,
    production: PropTypes.array.isRequired,
};

export default BuildingCard;
