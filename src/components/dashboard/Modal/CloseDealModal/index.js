import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { ethers } from 'ethers';
import RoundedButton from 'components/common/button/rounded-button';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import CustomSlider from 'components/common/progress-bar/custom-slider';
import CustomInput from 'components/common/input/custom-input';
import NumberInput from 'components/common/input/number-input';
import CircleLoading from 'components/common/loading/circle-loading';
import './index.scss';

const CloseDealModal = ({ open, isPending, deal, onOk, onClose }) => {
  const [closeAmount, setCloseAmount] = useState('0');
  const [destinationAddress, setDestinationAddress] = useState('');

  useEffect(() => {
    setCloseAmount(Number(deal.raisedAmount).toString());
  }, [deal]);

  const onChangeCloseAmount = (e) => {
    const { value } = e.target;
    if (Number(value.replaceAll(',', '')) > Number(deal.raisedAmount))
      return setCloseAmount((prev) => prev);
    setCloseAmount(value.replaceAll(',', ''));
  };

  const onChangeSlider = (_event, val) => {
    setCloseAmount(val.toString());
  };

  const onChangeDestinationAddress = (e) => {
    const { value } = e.target;
    setDestinationAddress(value);
  };

  const onConfirm = () => {
    if (!ethers.utils.isAddress(destinationAddress)) return;
    onOk(closeAmount, destinationAddress);
  };

  const getAddressStatus = () => {
    if (destinationAddress.length === 0) return '';
    return ethers.utils.isAddress(destinationAddress) ? 'success' : 'error';
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
          <RoundedButton disabled={isPending} onClick={onClose}>
            Cancel
          </RoundedButton>
          <RoundedButton
            type="secondary"
            disabled={
              isPending || !ethers.utils.isAddress(destinationAddress) || Number(closeAmount) <= 0
            }
            onClick={onConfirm}
          >
            <div className="d-flex">
              Confirm
              <CircleLoading loading={isPending} />
            </div>
          </RoundedButton>
        </div>
      </div>
      <div className="close-deal-modal-body">
        <div className="d-flex close-amount">
          <div className="close-amount-slider vertical-center">
            <CustomSlider
              value={closeAmount.replaceAll(',', '')}
              min={1}
              max={Number(deal.raisedAmount || 0)}
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
        <div className="destination-address">
          <CustomInput
            label="Destination Address"
            name="destinationAddress"
            value={destinationAddress}
            status={getAddressStatus()}
            onChange={onChangeDestinationAddress}
          />
        </div>
      </div>
      <div className="close-deal-modal-footer">
        <div className="closing-amount">
          <CustomInput label="Closing Amount" thousandSeparator value={closeAmount} disabled />
        </div>
        <div className="closing-token">
          <CustomInput label="Closing Token" isText value="USDT" disabled />
        </div>
      </div>
    </Dialog>
  );
};

CloseDealModal.propTypes = {
  open: PropTypes.bool,
  isPending: PropTypes.bool,
  deal: PropTypes.shape(),
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};

CloseDealModal.defaultProps = {
  open: false,
  isPending: false,
  deal: {},
  onClose: () => {},
  onOk: () => {},
};

export default CloseDealModal;
