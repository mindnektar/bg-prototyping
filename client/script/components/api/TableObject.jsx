import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DataContext from 'contexts/data';

const TableObject = (ownProps) => {
    const { groups } = useContext(DataContext);

    const itemData = (label) => {
        const { items } = groups.find((item) => item.label === label) || { items: [] };

        return items[ownProps.textureIndex] || {};
    };

    const { component, props } = itemData(ownProps.group);
    const objectData = {
        ...ownProps,
        textureIndex: component ? ownProps.textureIndex : undefined,
        contents: ownProps.contents ? ownProps.contents.map((item) => ({
            ...TableObject.defaultProps,
            ...item,
            textureIndex: itemData(item.group).component ? item.textureIndex : undefined,
        })) : undefined,
    };

    const placeholder = () => {
        if (ownProps.type === 'bag') {
            return 'BAG';
        }

        if (ownProps.type === 'deck') {
            return 'DECK';
        }

        return 'OBJ';
    };

    return (
        <div
            className={classNames(
                'table-object',
                {
                    'table-object--no-texture': !component,
                    'table-object--bag': ownProps.type === 'bag',
                }
            )}
            data-object={JSON.stringify(objectData)}
            style={!component ? { backgroundColor: ownProps.color } : null}
        >
            {component ? (
                React.createElement(component, props)
            ) : (
                <div className="table-object__placeholder">
                    {placeholder()}
                </div>
            )}
        </div>
    );
};

TableObject.defaultProps = {
    type: 'custom',
    group: null,
    textureIndex: 0,
    modelIndex: 0,
    zPosition: 0,
    collider: undefined,
    locked: undefined,
    gridSnapping: undefined,
    color: undefined,
    infinite: undefined,
    contents: undefined,
    glass: undefined,
    scale: undefined,
};

TableObject.propTypes = {
    type: PropTypes.string,
    group: PropTypes.string,
    textureIndex: PropTypes.number,
    modelIndex: PropTypes.number,
    zPosition: PropTypes.number,
    collider: PropTypes.oneOf(['self', 'custom']),
    locked: PropTypes.bool,
    gridSnapping: PropTypes.bool,
    color: PropTypes.string,
    infinite: PropTypes.bool,
    contents: PropTypes.array,
    glass: PropTypes.bool,
    scale: PropTypes.number,
};

export default TableObject;
