import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import types from './types';
import './index.scss';

const Icon = ({ name, width, height }) => {
  const Icons = types[name];
  return (
    <ReactSVG
      src={Icons}
      beforeInjection={(svg) => {
        svg.classList.add(`svg-${name}`);
        svg.setAttribute('style', `height: ${height}px`);
        svg.setAttribute('style', `width: ${width}px`);
      }}
      className="svg-icon-wrapper"
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
Icon.defaultProps = {
  width: 24,
  height: 24,
};
export default Icon;
