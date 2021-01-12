import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import RoundedButton from 'components/common/button/rounded-button';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import CustomInput from 'components/common/input/custom-input';
import CircleLoading from 'components/common/loading/circle-loading';
import './index.scss';

const ClaimDealModal = ({ open, isPending, deal, onOk, onClose }) => {
  return (
    <Dialog open={open} className="claim-deal-modal" id="claim-deal-modal" onClose={onClose}>
      <div className="claim-deal-modal-header d-flex">
        <div className="claim-deal-modal-header__left d-flex vertical-center">
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
        <div className="claim-deal-modal-header__right vertical-center">
          <RoundedButton disabled={isPending} onClick={onClose}>
            Cancel
          </RoundedButton>
          <RoundedButton type="secondary" disabled={isPending} onClick={onOk}>
            <div className="d-flex">
              Confirm
              <CircleLoading loading={isPending} />
            </div>
          </RoundedButton>
        </div>
      </div>
      <div className="claim-deal-modal-body">
        <div className="d-flex">
          <div className="claim-token">
            <CustomInput label="Name" isText value="USDT" disabled />
          </div>
          <div className="deal-address">
            <CustomInput label="Address" isText value={deal.address} disabled />
          </div>
        </div>
        <div className="d-flex">
          <div className="claim-symbol">
            <CustomInput label="Symbol" isText value="USDT" disabled />
          </div>
          <div className="claim-amount">
            <CustomInput
              label="Amount"
              thousandSeparator
              value={Number(deal.raisedAmount).toString()}
              disabled
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

ClaimDealModal.propTypes = {
  open: PropTypes.bool,
  isPending: PropTypes.bool,
  deal: PropTypes.shape(),
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};

ClaimDealModal.defaultProps = {
  open: false,
  isPending: false,
  deal: {},
  onClose: () => {},
  onOk: () => {},
};

export default ClaimDealModal;
