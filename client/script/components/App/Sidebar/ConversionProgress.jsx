import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Headline from 'atoms/Headline';
import Loading from 'atoms/Loading';
import Button from 'atoms/Button';

const ConversionProgress = (props) => {
    const selectAll = (event) => {
        const range = document.createRange();
        range.selectNode(event.target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    };

    const renderContent = () => (
        <div className="conversion-progress">
            <div className="conversion-progress__overlay" />

            <div className="conversion-progress__body">
                <div className="conversion-progress__group conversion-progress__group--active">
                    <Headline>1. Converting markup to images</Headline>

                    <div className="conversion-progress__content">
                        {props.progress.uploading || !!props.progress.result ? (
                            <div className="conversion-progress__check">&#10004;</div>
                        ) : (
                            <div className="conversion-progress__progress">
                                <div
                                    className="conversion-progress__progress-bar"
                                    style={{ transform: `translateX(${((props.progress.image.done / props.progress.image.total) * 100) - 100}%)` }}
                                />

                                <div className="conversion-progress__progress-text">
                                    {`${props.progress.image.done} / ${props.progress.image.total}`}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={classNames(
                        'conversion-progress__group',
                        { 'conversion-progress__group--active': props.progress.uploading || !!props.progress.result }
                    )}
                >
                    <Headline>2. Uploading to FTP server</Headline>

                    <div className="conversion-progress__content">
                        {props.progress.result ? (
                            <div className="conversion-progress__check">&#10004;</div>
                        ) : (
                            <Loading disabled={!props.progress.uploading} />
                        )}
                    </div>
                </div>

                <div
                    className={classNames(
                        'conversion-progress__group',
                        { 'conversion-progress__group--active': !!props.progress.result }
                    )}
                >
                    <Headline>Result</Headline>

                    <div className="conversion-progress__content">
                        <div
                            className="conversion-progress__result"
                            onClick={selectAll}
                        >
                            {props.progress.result}
                        </div>

                        <Button onClick={props.close}>OK</Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        <TransitionGroup component={React.Fragment}>
            {props.progress !== null && (
                <CSSTransition
                    classNames="conversion-progress-"
                    mountOnEnter
                    timeout={300}
                    unmountOnExit
                >
                    {renderContent()}
                </CSSTransition>
            )}
        </TransitionGroup>,
        document.body
    );
};

ConversionProgress.defaultProps = {
    progress: null,
};

ConversionProgress.propTypes = {
    progress: PropTypes.object,
};

export default ConversionProgress;
