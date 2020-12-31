import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/common/svgIcon';
import './index.scss';

function SearchInput({ value, placeholder, onChange }) {
  return (
    <div className="search-input d-flex">
      <div className="input-icon-wrapper vertical-center">
        <SvgIcon name="search" />
      </div>
      <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

SearchInput.defaultProps = {
  value: '',
  placeholder: 'Search for anything...',
  onChange: () => {},
};

export default SearchInput;
