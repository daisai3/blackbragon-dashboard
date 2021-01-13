import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import './index.scss';

const PrettoSlider = withStyles({
  root: {
    color: '#029e80',
    height: 4,
  },
  disabled: {
    color: '#029e80!important',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '4px solid #029e80',
    marginTop: -6,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: '0px 0px 0px 8px rgba(#029e80, 0.16)!important',
    },
    '&$disabled': {
      marginTop: `-3px!important`,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
    color: '#323232',
  },
})(Slider);

const CustomSlider = ({ value, min, max, disabled, onChange }) => {
  return (
    <div className="custom-slider">
      <div className="custom-slider__label">
        <div className="custom-slider__label-min">
          <NumberFormat value={min} thousandSeparator displayType="text" />
        </div>
        <div className="custom-slider__label-max">
          <NumberFormat value={max} thousandSeparator displayType="text" />
        </div>
      </div>

      <PrettoSlider
        min={min}
        step={50}
        max={max}
        value={Number(value)}
        disabled={disabled}
        onChange={onChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
};

CustomSlider.propTypes = {
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomSlider.defaultProps = {
  value: '20',
  min: '0',
  max: '20',
  disabled: false,
  onChange: () => {},
};

export default CustomSlider;
