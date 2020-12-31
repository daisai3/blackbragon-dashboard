import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/common/button/icon-button';
import './index.scss';

const filters = [
  { id: 1, name: `Filter #1`, value: 'filter1' },
  { id: 2, name: `Filter #2`, value: 'filter2' },
  { id: 3, name: `Filter #3`, value: 'filter3' },
];

function FilterSelect({ onSelect }) {
  const onClickMenu = (e, menu) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div className="dropdown filter-dropdown">
      <div
        className="dropdown-toggle d-flex"
        id="filter-dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <IconButton icon="filter" onClick={(e) => e.stopPropagation()}>
          <span>Filter</span>
        </IconButton>
      </div>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="filter-dropdown-toggle">
        {filters.map((menu) => (
          <div
            type="button"
            key={menu.id}
            className="dropdown-menu__item d-flex"
            role="presentation"
            onClick={(e) => {
              onClickMenu(e, menu);
            }}
          >
            <div className="dropdown-menu__item-name">{menu.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

FilterSelect.propTypes = {
  onSelect: PropTypes.func,
};

FilterSelect.defaultProps = {
  onSelect: () => {},
};

export default FilterSelect;
