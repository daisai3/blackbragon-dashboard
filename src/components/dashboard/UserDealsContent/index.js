import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SearchInput from 'components/common/input/search-input';
import FilterSelect from 'components/common/select/filter-select';
import RoundedButton from 'components/common/button/rounded-button';
import DealsTable from 'components/dashboard/DealsTable';
import './index.scss';

function UserDealsContent() {
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const onSelectFilter = () => {};

  const dealsCnt = 10;

  return (
    <div className="deals-container">
      <div className="deals-header">
        <div className="deals-header-left d-flex">
          <div className="deals-header__title vertical-center">Deals</div>
          <div className="deals-header__deals-cnt vertical-center">
            <span>{`${dealsCnt} Total`}</span>
          </div>
        </div>
        <div className="deals-header-right d-flex">
          <div className="search-input-container vertical-center">
            <SearchInput
              value={searchValue}
              placeholder="Search deals by name"
              onChange={onChangeSearch}
            />
          </div>
          <div className="filter-container vertical-center">
            <FilterSelect onSelect={onSelectFilter} />
          </div>
        </div>
      </div>
      <div className="deals-content">
        <div className="filters-container d-flex">
          <div className="filter-btn-wrapper">
            <RoundedButton>
              <span>Filter #1</span>
            </RoundedButton>
          </div>
          <div className="filter-btn-wrapper">
            <RoundedButton>
              <span>Filter #2</span>
            </RoundedButton>
          </div>
          <div className="filter-btn-wrapper">
            <RoundedButton>
              <span>Filter #3</span>
            </RoundedButton>
          </div>
        </div>
        <div className="deals-table-container">
          <DealsTable />
        </div>
      </div>
    </div>
  );
}

UserDealsContent.propTypes = {};

UserDealsContent.defaultProps = {};

export default withRouter(UserDealsContent);
