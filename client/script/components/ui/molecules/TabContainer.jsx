import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '@rehooks/local-storage';
import classNames from 'classnames';

const TabContainer = (props) => {
    const [activeTab, setActiveTab] = useLocalStorage(`${props.name}ActiveTab`, 0);

    const selectTabHandler = (index) => () => {
        setActiveTab(index);
    };

    return (
        <div className="ui-tab-container">
            <div className="ui-tab-container__tabs">
                {props.tabs.map(({ label }, index) => (
                    <div
                        key={label}
                        className={classNames(
                            'ui-tab-container__tab',
                            { 'ui-tab-container__tab--selected': activeTab === index }
                        )}
                        onClick={selectTabHandler(index)}
                    >
                        {label}
                    </div>
                ))}
            </div>

            <div className="ui-tab-container__content">{props.tabs[activeTab].content}</div>
        </div>
    );
};

TabContainer.propTypes = {
    name: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        content: PropTypes.node.isRequired,
    })).isRequired,
};

export default TabContainer;
