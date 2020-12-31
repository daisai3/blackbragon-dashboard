import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import NotificationSelect from 'components/common/select/notification-select';
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
  return (
    <div className="header-bar">
      <div className="header-bar__left vertical-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="header-bar__right vertical-center">
        <div className="notification-container">
          <NotificationSelect notifications={notifications} />
        </div>
        <div className="account-avatar-container vertical-center">
          <RoundedAvatar />
        </div>
      </div>
    </div>
  );
}

HeaderBar.propTypes = { history: PropTypes.shape() };

HeaderBar.defaultProps = { history: {} };

export default withRouter(HeaderBar);
