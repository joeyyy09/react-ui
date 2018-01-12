import PropTypes from 'prop-types';
import React from 'react';
import UserInputBase from '../UserInputBase';

const TextField = (props) => {
  const {
    placeholder,
    type,
    ...higherOrderProps
  } = props;

  return (
    <input
      {...higherOrderProps}
      placeholder={placeholder}
      type={type}
    />
  );
};

TextField.defaultProps = {
  placeholder: null,
  type: 'text',
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
};

export default UserInputBase(TextField);
