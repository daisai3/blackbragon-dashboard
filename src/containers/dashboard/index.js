import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import HeaderBar from 'components/dashboard/HeaderBar';
import LeftSideBar from 'components/dashboard/LeftSideBar';
import UserDealsContent from 'components/dashboard/UserDealsContent';
import './index.scss';

function Dashboard({ onConnect }) {
  const globalReducer = useSelector((state) => state.global);
  const { notificationDropdownOpened } = globalReducer;

  useEffect(() => {
    onConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userType = 'user';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <HeaderBar />
      </div>
      <div className="dashboard-content d-flex">
        <div className="dashboard-content__left">
          <LeftSideBar />
        </div>
        <div className="dashboard-content__right">
          {notificationDropdownOpened && <div className="overlay-background-container" />}
          {userType === 'user' && <UserDealsContent />}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
