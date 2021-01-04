import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';
import './index.scss';

const CustomProgressBar = ({ percent }) => {
  return <Progress className="custom-progress-bar" percent={percent} />;
};

CustomProgressBar.propTypes = {
  percent: PropTypes.number,
};

CustomProgressBar.defaultProps = {
  percent: 0,
};

export default CustomProgressBar;
