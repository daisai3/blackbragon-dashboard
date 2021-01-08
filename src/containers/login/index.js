import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from 'assets/logo.svg';
import { DashboardPreview } from 'constants/index';
import DisclaimModal from 'components/login/DisclaimModal';
import RoundedButton from 'components/common/button/rounded-button';
import './index.scss';

function Login({ onConnect }) {
  const [disclaimModalOpened, setDisclaimModalOpened] = useState(false);

  const onToggleDisclaimModal = () => {
    setDisclaimModalOpened(!disclaimModalOpened);
  };

  const onLogin = async () => {
    onToggleDisclaimModal();
  };

  const onConfirmLogin = () => {
    onToggleDisclaimModal();
    onConnect();
  };

  return (
    <>
      <DisclaimModal
        open={disclaimModalOpened}
        onClose={onToggleDisclaimModal}
        onConfirm={onConfirmLogin}
      />
      <div className="auth-container d-flex">
        <div className="login-left vertical-center">
          <div className="login-left-content">
            <div className="logo-container">
              <img src={Logo} alt="logo" />
            </div>
            <div className="get-started">
              <h1 className="header1">Sign in to BlackDragon</h1>
              <h4 className="header4">MetaMask is locked or not connected!</h4>
              <h4 className="header4">Please click Connect Account button to proceed.</h4>
              <RoundedButton className="login-btn" onClick={onLogin}>
                <span className="button-big">Connect Account</span>
              </RoundedButton>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="dashboard-preview">
            <img src={DashboardPreview} alt="dashboard-preview" />
          </div>
        </div>
        <div className="login-gradient-bg" />
      </div>
    </>
  );
}

Login.propTypes = {
  onConnect: PropTypes.func,
};

Login.defaultProps = {
  onConnect: () => {},
};

export default Login;
