import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function RoundedButton({ className, type, disabled, onClick, children }) {
  return (
    <button
      className={`rounded-btn ${className} rounded-btn--${type} ${
        disabled ? 'rounded-btn--disabled' : ''
      }`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

RoundedButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

RoundedButton.defaultProps = {
  className: '',
  type: 'default',
  disabled: false,
  onClick: () => {},
};

export default RoundedButton;
