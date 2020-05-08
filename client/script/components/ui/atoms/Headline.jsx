import React from 'react';
import PropTypes from 'prop-types';

const Headline = (props) => (
    <div className="ui-headline">
        <span>{props.children}</span>
    </div>
);

Headline.propTypes = {
    children: PropTypes.string.isRequired,
};

export default Headline;
