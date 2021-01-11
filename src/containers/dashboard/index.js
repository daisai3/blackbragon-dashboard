import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderBar from 'components/dashboard/HeaderBar';
import LeftSideBar from 'components/dashboard/LeftSideBar';
import DealsContent from 'components/dashboard/DealsContent';
import './index.scss';

function Dashboard({ onConnect }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const globalReducer = useSelector((state) => state.global);
  const { notificationDropdownOpened, activeDeal } = globalReducer;

  const updateSize = () => {
    const dashboardContentLeft = document.getElementById('dashboard-content__left');
    const dashboardContentRight = document.getElementById('dashboard-content__right');
    const dashboardHeader = document.getElementById('dashboard-header');

    if (dashboardContentLeft && dashboardContentLeft) {
      dashboardHeader.style.width = `calc(100% - ${dashboardContentLeft.offsetWidth}px)`;
      dashboardHeader.style.left = `${dashboardContentLeft.offsetWidth}px`;
      dashboardContentRight.style.width = `calc(100% - ${dashboardContentLeft.offsetWidth}px)`;
      dashboardContentRight.style.marginLeft = `${dashboardContentLeft.offsetWidth}px`;
    }
  };

  useEffect(() => {
    onConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateSize();
  }, [isSidebarExpanded]);

  const onToggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" id="dashboard-header">
        <HeaderBar />
      </div>
      <div className="dashboard-content d-flex">
        <div className="dashboard-content__left" id="dashboard-content__left">
          <LeftSideBar isExpanded={isSidebarExpanded} onToggleSidebar={onToggleSidebar} />
        </div>
        <div className="dashboard-content__right" id="dashboard-content__right">
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
