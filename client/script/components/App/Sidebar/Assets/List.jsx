import React from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'animated-scroll-to';
import { useLocalStorage } from '@rehooks/local-storage';
import Icon from 'atoms/Icon';

const List = (props) => {
    const [filter, setFilter] = useLocalStorage('filter', []);

    const setFilterHandler = (item) => (event) => {
        event.stopPropagation();

        const newFilter = [...filter];
        const index = newFilter.indexOf(item);

        if (index >= 0) {
            newFilter.splice(index, 1);
        } else {
            newFilter.push(item);
        }

        setFilter(newFilter);
    };

    const scrollToHandler = (item) => () => {
        const element = document.querySelector(`[data-scroll="${item}"]`);

        if (!element) {
            return;
        }

        scrollToElement(
            element,
            {
                verticalOffset: -16,
                cancelOnUserAction: false,
                horizontal: false,
                speed: 100,
                elementToScroll: document.querySelector('.content'),
            }
        );
    };

    return (
        <div className="assets-list">
            {props.groups.map((group) => (
                <div
                    key={group.label}
                    className="assets-list__item"
                    onClick={scrollToHandler(group.label)}
                >
                    {group.label}

                    <div onClick={setFilterHandler(group.label)}>
                        <Icon type={filter.includes(group.label) ? 'hidden' : 'visible'} />
                    </div>
                </div>
            ))}
        </div>
    );
};

List.propTypes = {
    groups: PropTypes.array.isRequired,
};

export default List;
