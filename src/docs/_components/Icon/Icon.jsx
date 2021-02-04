import PropTypes from 'prop-types';
import React from 'react';
import styles from './Icon.scss';

export const Icon = ({ icon }) => {
  let svg = '';

  if (icon === 'down') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" /></svg>;
  } else if (icon === 'loading') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" /><path d="M0 0h24v24H0z" fill="none" /></svg>;
  } else if (icon === 'pencil') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 16 16" width="24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M10.844,3.116l0.255,0.255l1.53,1.53l0.255,0.255l0.255,-0.255l0.511,-0.509l0.254,-0.256c0.141,-0.139 0.141,-0.369 0,-0.51l-1.529,-1.53c-0.141,-0.141 -0.371,-0.14 -0.511,0l-0.255,0.255l-0.51,0.511l-0.255,0.254Z" fillRule="nonzero" /><path d="M10.227,3.733l-6.42,6.42l2.041,2.04l6.42,-6.42l-2.041,-2.04Z" /><path d="M3.19,10.77l-1.182,3.076c-0.051,0.131 0.015,0.197 0.146,0.146l3.076,-1.181l-2.04,-2.041Z" fillRule="nonzero" /></svg>;
  } else if (icon === 'star') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" /></svg>;
  } else if (icon === 'success') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>;
  } else if (icon === 'up') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg>;
  } else if (icon === 'warning-sign') {
    svg = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 16 16" width="24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M14.825,12.877l-6.189,-10.477c-0.134,-0.233 -0.382,-0.377 -0.65,-0.377c-0.269,0 -0.517,0.144 -0.651,0.377l-6.189,10.477c-0.133,0.232 -0.132,0.517 0.002,0.749c0.134,0.232 0.382,0.374 0.649,0.374l12.377,0c0.268,0 0.515,-0.143 0.65,-0.374c0.133,-0.232 0.134,-0.517 0.001,-0.749Zm-11.734,-0.377l4.895,-8.399l4.894,8.399l-9.789,0Zm5.645,-1.813l0,1.126c0,0.103 -0.084,0.187 -0.188,0.187l-1.125,0c-0.103,0 -0.187,-0.084 -0.187,-0.187l0,-1.125c0,-0.104 0.084,-0.188 0.187,-0.188l1.125,0c0.104,0 0.188,0.084 0.188,0.188Zm-1.251,-4.188l1.001,0c0.137,0 0.25,0.113 0.25,0.25l0,0.938c0,0.103 -0.017,0.27 -0.037,0.371l-0.337,1.726c-0.02,0.101 -0.121,0.215 -0.225,0.215l-0.294,0c-0.103,0 -0.204,-0.114 -0.225,-0.215l-0.345,-1.711c-0.021,-0.101 -0.037,-0.283 -0.037,-0.386l0,-0.939c0,-0.136 0.112,-0.249 0.249,-0.249Z" fillRule="nonzero" /></svg>;
  }

  return (
    <span className={styles.root}>
      {svg}
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf([
    'down',
    'loading',
    'pencil',
    'star',
    'success',
    'up',
    'warning-sign',
  ]).isRequired,
};

export default Icon;
