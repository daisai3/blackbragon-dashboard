import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import CustomSlider from 'components/common/progress-bar/custom-slider';
import NumberInput from 'components/common/input/number-input';
import CircleLoading from 'components/common/loading/circle-loading';
import { updateGlobal } from 'store/actions';
import { approveDeal, contributeDeal } from 'contracts/index';
import './index.scss';

const DealEditRow = ({ deal, onFetchDeals }) => {
  const dispatch = useDispatch();
  const [contributionValue, setContributionValue] = useState('0');
  const [isApproved, setApproved] = useState(false);
  const [isPending, setPending] = useState(false);

  const onChangeContributionValue = (e) => {
    if (isApproved || isPending) return;
    const { value } = e.target;
    if (Number(value) > Number(deal.personalCap)) return;
    setContributionValue(value);
  };

  const onBlurContributeValue = () => {
    if (Number(contributionValue) < Number(deal.minContribution)) {
      setContributionValue(deal.minContribution);
    }
  };

  const onChangeContributionSlider = (event, val) => {
    if (isApproved || isPending) return;
    if (val < Number(deal.contributedAmount)) return;
    setContributionValue((val - Number(deal.contributedAmount)).toString());
  };

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
    setContributionValue('');
  };

  const callApprove = async () => {
    setPending(true);
    const result = await approveDeal(deal.address, contributionValue);
    dispatch(updateGlobal({ dealApprovedStatus: result ? 'approved' : 'approveFailed' }));
    setPending(false);
    setApproved(true);
  };

  const callContribute = async () => {
    setPending(true);
    const result = await contributeDeal(deal.address, contributionValue);
    dispatch(updateGlobal({ dealApprovedStatus: result ? 'contributed' : 'contributeFailed' }));
    setPending(false);
    setApproved(false);
    onFetchDeals();
  };

  const onApprove = async () => {
    if (!isApproved) await callApprove();
    else {
      await callContribute();
      onCloseDealModal();
    }
  };

  return (
    <div className="d-flex full-width">
      <div className="deal__field deal__field-avatar vertical-center">
        <RoundedAvatar src={deal.imageUrl} />
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
      <div className="deal__field deal__field-modal-bar vertical-center">
        <CustomSlider
          value={(Number(deal.contributedAmount) + Number(contributionValue)).toString()}
          min={Number(deal.minContribution)}
          max={Number(deal.personalCap || 0) + Number(deal.contributedAmount)}
          onChange={onChangeContributionSlider}
        />
      </div>
      <div className="deal__field deal__field-modal-contribution vertical-center">
        <span>
          <NumberInput
            placeholder=""
            value={contributionValue}
            disabled={isApproved || isPending}
            onChange={onChangeContributionValue}
            onBlur={onBlurContributeValue}
          />
        </span>
        <span>USDT</span>
      </div>
      <div className="deal__field deal__field-modal-action vertical-center">
        <RoundedButton disabled={isPending} onClick={onCloseDealModal}>
          Cancel
        </RoundedButton>
        <RoundedButton
          type="primary"
          disabled={
            isPending ||
            Number(contributionValue) === 0 ||
            Number(deal.contributedAmount) + Number(contributionValue) <
              Number(deal.minContribution)
          }
          onClick={onApprove}
        >
          <div className="d-flex">
            {isApproved ? 'Contribute' : 'Approve'}
            <CircleLoading loading={isPending} />
          </div>
        </RoundedButton>
      </div>
    </div>
  );
};

DealEditRow.propTypes = {
  deal: PropTypes.shape(),
  onFetchDeals: PropTypes.func,
};

DealEditRow.defaultProps = {
  deal: {},
  onFetchDeals: () => {},
};

export default React.memo(DealEditRow);
