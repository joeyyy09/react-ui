import flattenChildren from 'react-keyed-flatten-children';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Grid.scss';

export const Grid = (props) => {
  const {
    children,
    id,
    ...other
  } = props;

  if (!props.children) {
    return null;
  }

  return (
    <div
      id={id}
      className={styles.root}
      {...other}
    >
      {flattenChildren(children).map((child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child);
      })}
    </div>
  );
};

Grid.defaultProps = {
  children: null,
  id: undefined,
};

Grid.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export default Grid;