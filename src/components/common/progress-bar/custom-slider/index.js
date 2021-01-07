import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import './index.scss';
import { FormattedNumber } from 'react-intl';

const PrettoSlider = withStyles({
  root: {
    color: '#029e80',
    height: 4,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '4px solid #029e80',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
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
