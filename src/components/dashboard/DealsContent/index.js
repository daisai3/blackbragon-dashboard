import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchInput from 'components/common/input/search-input';
// import FilterSelect from 'components/common/select/filter-select';
import UserDealsTable from 'components/dashboard/DealsTable/UserDealsTable';
import AdminDealsTable from 'components/dashboard/DealsTable/AdminDealsTable';
import { getDealModels } from 'contracts/index';
import './index.scss';

function DealsContent() {
  const [searchValue, setSearchValue] = useState('');
  const [userDeals, setUserDeals] = useState([]);
  const authReducer = useSelector((state) => state.auth);
  const { accountInfo, isAdmin, walletAddress } = authReducer;

  const fetchUserDeals = async () => {
    const { userAccessLevel } = accountInfo;
    const deals = await getDealModels(userAccessLevel);
    const _deals = deals.map((deal, index) => {
      return {
        id: index.toString(),
        ...deal,
      };
    });
    setUserDeals(_deals);
  };

  useEffect(() => {
    fetchUserDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUserDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className="deals-container">
      <div className="deals-header">
        <div className="deals-header-left d-flex">
          <div className="deals-header__title vertical-center">Deals</div>
          <div className="deals-header__deals-cnt vertical-center">
            <span>{`${userDeals.length} Total`}</span>
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
          {/* <div className="filter-container vertical-center">
            <FilterSelect />
          </div> */}
        </div>
      </div>
      {userDeals.length > 0 && (
        <div className="deals-content">
          {isAdmin ? (
            <AdminDealsTable userDeals={userDeals} onFetchDeals={fetchUserDeals} />
          ) : (
            <UserDealsTable userDeals={userDeals} onFetchDeals={fetchUserDeals} />
          )}
        </div>
      )}
    </div>
  );
}

DealsContent.propTypes = {};

DealsContent.defaultProps = {};

export default DealsContent;
