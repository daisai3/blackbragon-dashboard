import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import RoundedButton from 'components/common/button/rounded-button';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import CustomSlider from 'components/common/progress-bar/custom-slider';
import CustomInput from 'components/common/input/custom-input';
import NumberInput from 'components/common/input/number-input';
import './index.scss';

const CloseDealModal = ({ open, deal, onOk, onClose }) => {
  const [closeAmount, setCloseAmount] = useState('0');

  const onChangeCloseAmount = (e) => {
    const { value } = e.target;
    // if (!deal.userCap || Number(value) > Number(deal.userCap)) setCloseAmount(closeAmount);
    setCloseAmount(value);
  };

  const onChangeSlider = (event, val) => {
    setCloseAmount(val.toString());
  };

  return (
    <Dialog open={open} className="close-deal-modal" id="close-deal-modal" onClose={onClose}>
      <div className="close-deal-modal-header d-flex">
        <div className="close-deal-modal-header__left d-flex vertical-center">
          <div className="deal-avatar vertical-center">
            <a
              href={`https://etherscan.io/address/${deal.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RoundedAvatar src={deal.imageUrl} />
            </a>
          </div>
          <div className="deal-name vertical-center">
            <div className="full-width">
              <span>{deal.name}</span>
              <CustomProgressBar total={Number(deal.dealSize)} value={Number(deal.raisedAmount)} />
            </div>
          </div>
        </div>
        <div className="close-deal-modal-header__right vertical-center">
          <RoundedButton onClick={onClose}>Cancel</RoundedButton>
          <RoundedButton type="secondary" onClick={onOk}>
            Confirm
          </RoundedButton>
        </div>
      </div>
      <div className="close-deal-modal-body d-flex">
        <div className="d-flex close-amount">
          <div className="close-amount-slider vertical-center">
            <CustomSlider
              value={closeAmount.replace(',', '')}
              min={deal.minContribution}
              max={deal.userCap || '0'}
              onChange={onChangeSlider}
            />
          </div>
          <div className="close-amount-input vertical-center">
            <span>
              <NumberInput placeholder="" value={closeAmount} onChange={onChangeCloseAmount} />
            </span>
            <span className="close-amount-input-unit">USDT</span>
          </div>
        </div>
      </div>
      <div className="close-deal-modal-footer">
        <div className="closing-amount">
          <CustomInput label="Closing Amount" thousandSeparator value={closeAmount} disabled />
        </div>
        <div className="closing-token">
          <CustomInput label="Closing Token" value="USDT" disabled />
        </div>
      </div>
    </Dialog>
  );
};

CloseDealModal.propTypes = {
  open: PropTypes.bool,
  deal: PropTypes.shape(),
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};

CloseDealModal.defaultProps = {
  open: false,
  deal: {},
  onClose: () => {},
  onOk: () => {},
};

export default CloseDealModal;
