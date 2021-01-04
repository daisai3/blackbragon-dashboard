import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SvgIcon from 'components/common/svgIcon';
import IconButton from 'components/common/button/icon-button';
import './index.scss';

const menuItems = [
  { id: 0, name: 'Deals', value: 'deal1', icon: 'chart' },
  { id: 1, name: 'Deals', value: 'deal2', icon: 'chart' },
  { id: 2, name: 'Deals', value: 'deal3', icon: 'chart' },
  { id: 3, name: 'Deals', value: 'deal4', icon: 'chart' },
  { id: 4, name: 'Deals', value: 'deal5', icon: 'chart' },
];

function LeftSideBar() {
  const [currentTab, setCurrentTab] = useState(menuItems[0]);
  const [accountInfo] = useState({
    level: 0,
    prorata: 1,
    bdtBalance: 100,
    usdtBalance: 100,
  });

  const onSelectMenu = (item) => {
    setCurrentTab(item);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top vertical-center">
        <div className="chart-btn-container">
          <IconButton icon="chart" />
        </div>
      </div>
      <div className="sidebar__content">
        <div className="sidebar-menu">
          {menuItems.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-menu__item vertical-center ${
                  item.value === currentTab.value ? 'sidebar-menu__item--active' : ''
                }`}
                onClick={() => onSelectMenu(item)}
              >
                <div className="d-flex">
                  <span className="sidebar-menu__item-icon vertical-center">
                    <SvgIcon name={item.icon} />
                  </span>
                  <span className="sidebar-menu__item-name button-big">{item.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="sidebar__footer">
        <div className="account-info">
          <div className="account-info__field">
            <h5 className="account-info__field-name body-1">Access Level</h5>
            <div className="account-info__field-value">{`Level ${accountInfo.level}`}</div>
          </div>
          <div className="account-info__field">
            <h5 className="account-info__field-name body-1">ProRata Share</h5>
            <div className="account-info__field-value">{`${accountInfo.prorata} %`}</div>
          </div>
          <div className="account-info__field">
            <h5 className="account-info__field-name body-1">BDT Tokens Held</h5>
            <div className="account-info__field-value">{`${accountInfo.bdtBalance} BDT`}</div>
          </div>
          <div className="account-info__field">
            <h5 className="account-info__field-name body-1">USDT Tokens Held</h5>
            <div className="account-info__field-value">{`${accountInfo.usdtBalance} USDT`}</div>
          </div>
        </div>
        <div className="meta-info">
          <div className="social-links">
            <a href="#" className="fa fa-google-plus" />
            <a href="#" className="fa fa-facebook" />
            <a href="#" className="fa fa-twitter" />
            <a href="#" className="fa fa-instagram" />
          </div>
          <div className="terms-and-policy">
            <div className="policy">
              <a href="/">Privacy policy</a>
            </div>
            <div className="terms">
              <a href="/">Terms and conditions</a>
            </div>
          </div>

          <div className="company-info">© 2020 Black Dragon</div>
        </div>
      </div>
    </div>
  );
}

LeftSideBar.propTypes = {};

LeftSideBar.defaultProps = {};

export default withRouter(LeftSideBar);
