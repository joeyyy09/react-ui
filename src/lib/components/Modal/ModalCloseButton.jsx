import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './ModalCloseButton.scss';

export const ModalCloseButton = React.forwardRef((props, ref) => {
  const {
    disabled,
    id,
    ...restProps
  } = props;

  const { translations } = useContext(RUIContext);

  return (
    <button
      {...transferProps(restProps)}
      type="button"
      className={styles.root}
      disabled={disabled}
      id={id}
      ref={ref}
      title={translations.ModalCloseButton.close}
    >
      ×
    </button>
  );
});

ModalCloseButton.defaultProps = {
  disabled: false,
  id: undefined,
  ref: undefined,
};

ModalCloseButton.propTypes = {
  /**
   * If `true`, close button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Reference forwarded to the `button` element.
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export const ModalCloseButtonWithGlobalProps = withGlobalProps(ModalCloseButton, 'ModalCloseButton');

export default ModalCloseButtonWithGlobalProps;
