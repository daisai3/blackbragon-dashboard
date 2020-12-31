import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function TextButton({ text, onClick }) {
  return (
    <div className="text-btn">
      <button type="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

TextButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

TextButton.defaultProps = {
  text: '',
  onClick: () => {},
};

export default TextButton;
