import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import NotificationSelect from 'components/common/select/notification-select';
import DealApproveNotification from 'components/dashboard/Notification';
import { updateGlobal } from 'store/actions';
import Logo from 'assets/logo.svg';
import './index.scss';

const notifications = [
  { id: 0, text: 'Deal has been approved', time: '23m' },
  { id: 1, text: 'Deal has been approved', time: '23m' },
  { id: 2, text: 'Deal has been approved', time: '23m' },
  { id: 3, text: 'Deal has been approved', time: '23m' },
  { id: 4, text: 'Deal has been approved', time: '23m' },
];

function HeaderBar() {
  const dispatch = useDispatch();
  const globalReducer = useSelector((state) => state.global);
  const { notificationDropdownOpened } = globalReducer;

  const onToggleNotification = () => {
    dispatch(updateGlobal({ notificationDropdownOpened: !notificationDropdownOpened }));
  };

  const onCloseNotification = () => {
    if (!notificationDropdownOpened) return;
    dispatch(updateGlobal({ notificationDropdownOpened: false }));
  };

  return (
    <div className="header-bar">
      <div className="header-bar__left vertical-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="header-bar__right vertical-center">
        <DealApproveNotification />
        <div className="notification-container">
          <NotificationSelect
            opened={notificationDropdownOpened}
            notifications={notifications}
            onToggle={onToggleNotification}
            onClose={onCloseNotification}
          />
        </div>
        <div className="account-avatar-container vertical-center">
          <RoundedAvatar />
        </div>
      </div>
    </div>
  );
}

HeaderBar.propTypes = {};

HeaderBar.defaultProps = {};

export default HeaderBar;
