import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Headline from 'atoms/Headline';
import Loading from 'atoms/Loading';
import Button from 'atoms/Button';
import Close from 'atoms/Close';

const ConversionProgress = (props) => {
    const renderContent = () => (
        <div className="conversion-progress">
            <div className="conversion-progress__overlay" />

            <div className="conversion-progress__body">
                <div className="conversion-progress__group conversion-progress__group--active">
                    <Headline>1. Converting markup to images</Headline>

                    <div className="conversion-progress__content">
                        {props.progress.uploading || props.progress.done ? (
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
                        { 'conversion-progress__group--active': props.progress.uploading || props.progress.done }
                    )}
                >
                    <Headline>2. Uploading to FTP server</Headline>

                    <div className="conversion-progress__content">
                        {props.progress.done ? (
                            <div className="conversion-progress__check">&#10004;</div>
                        ) : (
                            <Loading disabled={!props.progress.uploading} />
                        )}
                    </div>
                </div>

                <div
                    className={classNames(
                        'conversion-progress__group',
                        { 'conversion-progress__group--active': props.progress.done }
                    )}
                >
                    <Headline>3. Download TTS file</Headline>

                    <div className="conversion-progress__content">
                        <Button onClick={props.onDownload}>Download</Button>
                    </div>
                </div>
            </div>

            {props.progress.done && (
                <Close onClick={props.onClose} />
            )}
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
    onDownload: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ConversionProgress;
