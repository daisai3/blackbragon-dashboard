import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './index.scss';

function NumberInput({
  label,
  value,
  name,
  placeholder,
  disabled,
  isAllowNegative,
  onChange,
  onBlur,
}) {
  const onRealInputChange = (e) => {
    const _value = e.target.value.replaceAll(',', '');
    const _e = { ...e };
    _e.target.value = _value;

    if (Number(_value) >= 0) onChange(_e);
  };
  const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="custom-number-input">
      {label.length > 0 && <label htmlFor="custom-number-input">{label}</label>}
      <input
        type="text"
        name={name}
        value={formattedValue}
        className="real-input"
        placeholder={placeholder}
        disabled={disabled}
        onChange={onRealInputChange}
        onBlur={onBlur}
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
  onBlur: PropTypes.func,
};

NumberInput.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  disabled: false,
  isAllowNegative: true,
  onChange: () => {},
  onBlur: () => {},
};

export default NumberInput;
