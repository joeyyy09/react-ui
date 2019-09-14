import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import { withTranslationContext } from '../../../translation';
import styles from './Modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isContentOverflowing: false,
    };

    this.setGradient = this.setGradient.bind(this);
    this.pressEscapeHandler = this.pressEscapeHandler.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener('keydown', this.pressEscapeHandler, false);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.pressEscapeHandler, false);
  }

  setGradient() {
    if (!this.state.isContentOverflowing) {
      this.setState({ isContentOverflowing: true });
    }
  }

  pressEscapeHandler(e) {
    if (e.keyCode === 27 && this.props.closeHandler) {
      this.props.closeHandler();
    }
  }

  render() {
    return (
      <div
        className={styles.overlay}
        onClick={(e) => {
          if (this.props.closeHandler) {
            this.props.closeHandler(e);
          }
        }}
        onScroll={this.setGradient}
        role="presentation"
      >
        <div
          className={`
            ${styles.root}
            ${this.state.isContentOverflowing ? styles.isContentOverflowing : ''}
          `.trim()}
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="presentation"
        >
          <div className={styles.head}>
            <h3 className={styles.headTitle}>
              {this.props.title}
            </h3>
            {this.props.closeHandler && (
              <Button
                clickHandler={this.props.closeHandler}
                icon="close"
                labelVisibility="none"
                label={this.props.translations.close}
                priority="flat"
                size="large"
              />
            )}
          </div>
          <div className={styles.body}>
            {this.props.children}
          </div>
          <div className={styles.footer}>
            {this.props.actions.map((action) => (
              <Button
                clickHandler={action.clickHandler}
                disabled={action.disabled}
                key={action.label}
                label={action.label}
                loading={action.loading}
                variant={action.variant}
              />
            ))}
            {this.props.closeHandler && (
              <Button
                clickHandler={this.props.closeHandler}
                label={this.props.translations.close}
                priority="flat"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  actions: [],
  closeHandler: null,
};

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    variant: PropTypes.string,
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  closeHandler: PropTypes.func,
  title: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(Modal, 'Modal');