import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/common/svgIcon';
import IconButton from 'components/common/button/icon-button';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import { useOnClickOutside } from 'utils';
import './index.scss';

function NotificationSelect({ opened, notifications, onToggle, onClose }) {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    onClose();
  });

  return (
    <div className="notification-dropdown" ref={ref}>
      <div className="notification-dropdown-toggle d-flex" id="notification-dropdown-toggle">
        <IconButton icon="notification" onClick={onToggle} />
      </div>
      {opened && (
        <div className="notification-dropdown-menu">
          <div className="notification-dropdown-menu-header">
            <div className="notification-dropdown-menu-header__title">User Notifications</div>
            <div className="notification-dropdown-menu-header__description">{`${notifications.length} new notifications`}</div>
          </div>
          <div className="notification-dropdown-menu-content">
            {notifications.map((notification) => (
              <div
                type="button"
                key={notification.id}
                className="notification-dropdown-menu__item d-flex"
                role="presentation"
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
      )}
    </div>
  );
}

NotificationSelect.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape),
  onToggle: PropTypes.func,
  onClose: PropTypes.func,
};

NotificationSelect.defaultProps = {
  notifications: [],
  onToggle: () => {},
  onClose: () => {},
};

export default NotificationSelect;
