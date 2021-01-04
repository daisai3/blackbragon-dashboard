import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function CustomInput({ label, value, name, placeholder, disabled, onChange }) {
  return (
    <div className="custom-input">
      {label.length > 0 && <label htmlFor="custom-input">{label}</label>}
      <input
        type="text"
        id="custom-input"
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  disabled: false,
  onChange: () => {},
};

export default CustomInput;
