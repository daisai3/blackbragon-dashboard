import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/common/svgIcon';
import './index.scss';

function IconButton({ children, icon, onClick }) {
  return (
    <div className="icon-btn vertical-center">
      <button type="button" onClick={onClick}>
        <SvgIcon name={icon} />
        {children}
      </button>
    </div>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  icon: '',
  onClick: () => {},
};

export default IconButton;
