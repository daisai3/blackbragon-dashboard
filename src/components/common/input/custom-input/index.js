import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function CustomInput({ value, placeholder, onChange }) {
  return (
    <input
      type="text"
      className="custom-input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

CustomInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  value: '',
  placeholder: 'Search for anything...',
  onChange: () => {},
};

export default CustomInput;
