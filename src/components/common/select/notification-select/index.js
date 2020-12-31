import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/common/svgIcon';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';

import './index.scss';

function NotificationSelect({ notifications, onSelect }) {
  const onSelectNotification = (notification) => {
    // onSelect(notification.text);
  };

  return (
    <div className="dropdown notification-dropdown">
      <div
        className="dropdown-toggle d-flex"
        id="notification-dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <SvgIcon name="notification" />
      </div>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="notification-dropdown-toggle"
      >
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header__title">User Notifications</div>
          <div className="dropdown-menu-header__description">{`${notifications.length} new notifications`}</div>
        </div>

        <div className="dropdown-menu-content">
          {notifications.map((notification) => (
            <div
              type="button"
              key={notification.id}
              className="dropdown-menu__item d-flex"
              role="presentation"
              onClick={() => {
                onSelectNotification(notification);
              }}
            >
              <div className="notification-avatar vertical-center">
                <RoundedAvatar />
              </div>
              <div className="notification-content">
                <div className="notification-content__text">{notification.text}</div>
                <div className="notification-content__time">{`${notification.time} mins ago`}</div>
              </div>
              <div className="notification-icon vertical-center">
                <SvgIcon name="arrowRight" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

NotificationSelect.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape),
  onSelect: PropTypes.func,
};

NotificationSelect.defaultProps = {
  notifications: [],
  onSelect: () => {},
};

export default NotificationSelect;
