import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import { withTranslationContext } from '../Translation/index';
import styles from './ForgotPassword.scss';

const ForgotPassword = props => (
  <div className={styles.root}>
    {props.logoUrl && (
      <div className={styles.logoWrap}>
        <img
          src={props.logoUrl}
          className={styles.logo}
          alt={props.title || 'logo'}
        />
      </div>
    )}
    {props.title && (
      <div className={styles.title}>
        {props.title}
      </div>
    )}
    <div className={styles.box}>
      <form onSubmit={props.submitHandler}>
        {props.error && (
          <div className={styles.error}>
            {props.error}
          </div>
        )}
        <TextField
          fieldId="resetEmail"
          changeHandler={event => props.onChangeHandler('email', event.target.value)}
          label={props.translations.email}
          type="email"
          required
        />
        <Button label={props.translations.resetPassword} block priority="primary" type="submit" />
      </form>
      {props.footer && (
        <div className={styles.footer}>
          {props.footer}
        </div>
      )}
    </div>
  </div>
);

ForgotPassword.defaultProps = {
  error: null,
  footer: null,
  logoUrl: null,
  onChangeHandler: null,
  submitHandler: null,
  title: null,
};

ForgotPassword.propTypes = {
  error: PropTypes.string,
  footer: PropTypes.element,
  logoUrl: PropTypes.string,
  onChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  title: PropTypes.string,
  translations: PropTypes.shape({
    email: PropTypes.string.isRequired,
    resetPassword: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(ForgotPassword);