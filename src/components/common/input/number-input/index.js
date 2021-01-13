import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './index.scss';

function NumberInput({ label, value, name, placeholder, disabled, isAllowNegative, onChange }) {
  return (
    <div className="custom-number-input">
      {label.length > 0 && <label htmlFor="custom-number-input">{label}</label>}
      <input
        type="text"
        value={value}
        className="real-input"
        disabled={disabled}
        onChange={onChange}
      />
      <NumberFormat
        name={name}
        value={value}
        className="fake-input"
        placeholder={placeholder}
        disabled={disabled}
        displayType={disabled ? 'text' : 'input'}
        allowNegative={isAllowNegative}
        thousandSeparator
      />
    </div>
  );
}

NumberInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isAllowNegative: PropTypes.bool,
  onChange: PropTypes.func,
};

NumberInput.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  disabled: false,
  isAllowNegative: true,
  onChange: () => {},
};

export default NumberInput;
