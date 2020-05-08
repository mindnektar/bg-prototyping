import React from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'animated-scroll-to';
import Icon from 'atoms/Icon';

const List = (props) => {
    const setFilterHandler = (item) => (event) => {
        event.stopPropagation();

        const filter = [...props.filter];
        const index = filter.indexOf(item);

        if (index >= 0) {
            filter.splice(index, 1);
        } else {
            filter.push(item);
        }

        props.setFilter(filter);
    };

    const scrollToHandler = (item) => () => {
        scrollToElement(
            document.querySelector(`[data-scroll="${item}"]`),
            {
                verticalOffset: -16,
                cancelOnUserAction: false,
                horizontal: false,
                speed: 300,
                elementToScroll: document.querySelector('.content'),
            }
        );
    };

    return (
        <div className="sidebar-list">
            {props.groups.map((group) => (
                <div
                    key={group.label}
                    className="sidebar-list__item"
                    onClick={scrollToHandler(group.label)}
                >
                    {group.label}

                    <div onClick={setFilterHandler(group.label)}>
                        <Icon type={props.filter.includes(group.label) ? 'hidden' : 'visible'} />
                    </div>
                </div>
            ))}
        </div>
    );
};

List.propTypes = {
    filter: PropTypes.array.isRequired,
    setFilter: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
};

export default List;
