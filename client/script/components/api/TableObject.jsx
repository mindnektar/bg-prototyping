import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DataContext from 'contexts/data';

const TableObject = (props) => {
    const { groups } = useContext(DataContext);
    const { items } = groups.find(({ label }) => label === props.group);

    return (
        <div data-object={JSON.stringify(props)}>
            {React.createElement(
                items[props.textureIndex].component,
                items[props.textureIndex].props,
            )}
        </div>
    );
};

TableObject.defaultProps = {
    textureIndex: 0,
    modelIndex: 0,
    collider: null,
    locked: false,
};

TableObject.propTypes = {
    group: PropTypes.string.isRequired,
    textureIndex: PropTypes.number,
    modelIndex: PropTypes.number,
    collider: PropTypes.oneOf(['self', 'custom']),
    locked: PropTypes.bool,
};

export default TableObject;
