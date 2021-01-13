import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import MiddleEllipsis from 'react-middle-ellipsis';
import SvgIcon from 'components/common/svgIcon';
import './index.scss';

function CustomInput({
  label,
  value,
  name,
  placeholder,
  thousandSeparator,
  isText,
  status,
  disabled,
  onChange,
}) {
  return (
    <div className="custom-input-container">
      {label.length > 0 && <label htmlFor="custom-input">{label}</label>}
      {isText && (
        <span>
          <MiddleEllipsis>
            <span>{value}</span>
          </MiddleEllipsis>
        </span>
      )}
      {thousandSeparator && (
        <NumberFormat value={value} thousandSeparator={!isText} displayType="text" />
      )}
      {!thousandSeparator && !isText && (
        <div className="custom-input-wrapper">
          <input
            type="text"
            id="custom-input"
            className={`custom-input--${status}`}
            name={name}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
          />
          {status && (
            <div className="custom-input-icon vertical-center">
              <SvgIcon name={status} />
            </div>
          )}
        </div>
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
  status: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  thousandSeparator: false,
  isText: false,
  status: null,
  disabled: false,
  onChange: () => {},
};

export default CustomInput;
