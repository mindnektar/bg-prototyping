import React from 'react';
import PropTypes from 'prop-types';
import Gold from './Gold';

const colors = { A: '#a9d283', B: '#5a8236', C: '#e8df6f', D: '#898b90' };
const bonuses = { a: 'diamond', b: 'gold', ca: 'fabric', cb: 'wood', cc: 'wheat', cd: 'stone' };
const scale = { a: 1.5, b: 1.5, ca: 1.5, cb: 2, cc: 1.5, cd: 2 };

const Tile = (props) => (
    <div
        className="rev9-tile"
        style={{
            borderTopColor: colors[props.areas[0]],
            borderRightColor: colors[props.areas[1]],
            borderBottomColor: colors[props.areas[2]],
            borderLeftColor: colors[props.areas[3]],
        }}
    >
        {props.bonus.map((bonus, index) => (
            <div key={index} className="rev9-tile__bonus-wrapper">
                {bonus.type === 'b' ? (
                    <Gold
                        value={3}
                        style={{
                            transform: `translate(${bonus.x * 120}%, ${bonus.y * 120}%) scale(${scale[bonus.type]})`,
                        }}
                    />
                ) : (
                    <img
                        className="rev9-tile__bonus"
                        alt=""
                        src={`/images/rev9/icons/${bonuses[bonus.type]}.svg`}
                        style={{
                            transform: `translate(${bonus.x * 120}%, ${bonus.y * 120}%) scale(${scale[bonus.type]})`,
                        }}
                    />
                )}
            </div>
        ))}
    </div>
);

Tile.propTypes = {
    areas: PropTypes.string.isRequired,
    bonus: PropTypes.array.isRequired,
};

export default Tile;
