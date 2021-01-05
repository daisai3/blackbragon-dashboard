import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderBar from 'components/dashboard/HeaderBar';
import LeftSideBar from 'components/dashboard/LeftSideBar';
import DealsContent from 'components/dashboard/DealsContent';
import './index.scss';

function Dashboard({ onConnect }) {
  const globalReducer = useSelector((state) => state.global);
  const { notificationDropdownOpened, activeDeal } = globalReducer;

  useEffect(() => {
    onConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {(notificationDropdownOpened || activeDeal) && (
            <div className="overlay-background-container" />
          )}
          <DealsContent />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
