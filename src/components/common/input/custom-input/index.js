import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './index.scss';

function CustomInput({
  label,
  value,
  name,
  placeholder,
  thousandSeparator,
  isText,
  disabled,
  onChange,
}) {
  return (
    <div className="custom-input">
      {label.length > 0 && <label htmlFor="custom-input">{label}</label>}
      {isText && <span>{value}</span>}
      {thousandSeparator && (
        <NumberFormat value={value} thousandSeparator={!isText} displayType="text" />
      )}
      {!thousandSeparator && !isText && (
        <input
          type="text"
          id="custom-input"
          name={name}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  thousandSeparator: PropTypes.bool,
  isText: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  thousandSeparator: false,
  isText: false,
  disabled: false,
  onChange: () => {},
};

export default CustomInput;
