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

const CustomSlider = ({ value, min, max, onChange }) => {
  return (
    <div className="custom-slider">
      <div className="custom-slider__label">
        <div className="custom-slider__label-min">
          <NumberFormat value={Number(min).toString()} thousandSeparator displayType="text" />
        </div>
        <div className="custom-slider__label-max">
          <NumberFormat value={Number(max).toString()} thousandSeparator displayType="text" />
        </div>
      </div>

      <PrettoSlider
        min={Number(min)}
        step={10}
        max={Number(max)}
        value={Number(value)}
        onChange={onChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
};

CustomSlider.propTypes = {
  value: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
};

CustomSlider.defaultProps = {
  value: '20',
  min: '0',
  max: '20',
  onChange: () => {},
};

export default CustomSlider;
