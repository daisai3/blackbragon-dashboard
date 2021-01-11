import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import IconButton from 'components/common/button/icon-button';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import { updateGlobal } from 'store/actions';
import { cancelDeal, closeDeal, pauseDeal, unpauseDeal } from 'contracts/index';
import './index.scss';

const DealRow = ({ deal, onFetchDeals }) => {
  const dispatch = useDispatch();

  const onManage = () => {
    // TODO: should show modal
    dispatch(updateGlobal({ activeDeal: deal }));
  };

  const onUnpauseDeal = async () => {
    if (deal.status === 'opened') return;
    const result = await unpauseDeal(deal.address);
    if (result) onFetchDeals();
  };

  const onPauseDeal = async () => {
    if (deal.status === 'paused') return;
    const result = await pauseDeal(deal.address);
    if (result) onFetchDeals();
  };

  const onCloseDeal = async () => {
    if (deal.status === 'closed') return;
    const result = await closeDeal(deal.dealAddress);
    if (result) onFetchDeals();
  };

  const onCancelDeal = async () => {
    if (deal.status === 'canceled') return;
    const result = await cancelDeal(deal.address);
    if (result) onFetchDeals();
  };

  const onDistributeDeal = async () => {
    // TODO: should integrate smart contract
  };

  return (
    <div className="d-flex full-width">
      <div className="deal__field deal__field-avatar vertical-center">
        <a
          href={`https://etherscan.io/address/${deal.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RoundedAvatar src={deal.imageUrl} />
        </a>
      </div>
      <div className="deal__field deal__field-name vertical-center">
        <div>
          <span>{deal.name}</span>
          <CustomProgressBar total={Number(deal.dealSize)} value={Number(deal.raisedAmount)} />
        </div>
      </div>
      <div
        className={`deal__field deal__field-status deal__field-status--${deal.status} vertical-center`}
      >
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">
          {deal.status === 'opened' ? 'live' : deal.status}
        </span>
      </div>
      <div className="deal__field deal__field-raised-amount vertical-center">
        <NumberFormat
          value={Number(deal.raisedAmount)}
          thousandSeparator
          displayType="text"
          prefix="$"
        />
      </div>
      <div className="deal__field deal__field-size vertical-center">
        <NumberFormat
          value={Number(deal.dealSize)}
          thousandSeparator
          displayType="text"
          prefix="$"
        />
      </div>
      <div className="deal__field deal__field-model vertical-center">{deal.allocationModel}</div>
      <div className="deal__field deal__field-status-stepper vertical-center">
        <span
          className={`deal__field-status-step ${
            deal.status === 'opened' ? 'deal__field-status-step--opened--active' : ''
          }`}
        >
          <IconButton icon="statusOpened" onClick={onUnpauseDeal} />
        </span>
        <span
          className={`deal__field-status-step ${
            deal.status === 'paused' ? 'deal__field-status-step--paused--active' : ''
          }`}
        >
          <IconButton icon="statusPaused" onClick={onPauseDeal} />
        </span>
        <span
          className={`deal__field-status-step ${
            deal.status === 'closed' ? 'deal__field-status-step--closed--active' : ''
          }`}
        >
          <IconButton icon="statusClosed" onClick={onCloseDeal} />
        </span>
        <span
          className={`deal__field-status-step ${
            deal.status === 'canceled' ? 'deal__field-status-step--canceled--active' : ''
          }`}
        >
          <IconButton icon="statusCanceled" onClick={onCancelDeal} />
        </span>
        <span
          className={`deal__field-status-step ${
            deal.status === 'distributed' ? 'deal__field-status-step--distributed--active' : ''
          }`}
        >
          <IconButton icon="statusDistributed" onClick={onDistributeDeal} />
        </span>
      </div>
      <div className="deal__field deal__field-action vertical-center">
        <RoundedButton type="primary" onClick={onManage}>
          Manage
        </RoundedButton>
      </div>
    </div>
  );
};

DealRow.propTypes = {
  deal: PropTypes.shape(),
  onFetchDeals: PropTypes.func,
};

DealRow.defaultProps = {
  deal: {},
  onFetchDeals: () => {},
};

export default React.memo(DealRow);
