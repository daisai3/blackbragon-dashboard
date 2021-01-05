import React from 'react';
import PropTypes from 'prop-types';
import { TempAvatar } from 'constants/index';
import './index.scss';

function RoundedAvatar({ src, width, borderWidth, onClick }) {
  const onAddDefaultSrc = (ev) => {
    ev.target.src = TempAvatar;
  };

  return (
    <div className="img-wrapper rounded-img-wrapper" style={{ width, height: width }}>
      <img
        src={src}
        alt="avatar"
        style={{ borderWidth }}
        role="presentation"
        onError={onAddDefaultSrc}
        onClick={onClick}
      />
    </div>
  );
}

RoundedAvatar.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  borderWidth: PropTypes.number,
  onClick: PropTypes.func,
};

RoundedAvatar.defaultProps = {
  src: TempAvatar,
  width: 36,
  borderWidth: 2,
  onClick: () => {},
};

export default RoundedAvatar;
