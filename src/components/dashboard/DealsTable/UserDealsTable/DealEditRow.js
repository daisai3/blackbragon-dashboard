import React, { useState, useEffect } from 'react';
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
  const [contributionValue, setContributionValue] = useState('');
  const [isApproved, setApproved] = useState(false);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setContributionValue(Number(deal.contributedAmount).toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeContributionValue = (e) => {
    if (isApproved || isPending) return;
    const { value } = e.target;
    setContributionValue(value);
  };

  const onChangeContributionSlider = (event, val) => {
    if (isApproved || isPending) return;
    setContributionValue(val.toString());
  };

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
    setContributionValue('');
  };

  const callApprove = async () => {
    setPending(true);
    const result = await approveDeal(deal.address, contributionValue.replace(',', '').toString());
    dispatch(updateGlobal({ dealApprovedStatus: result ? 'approved' : 'approveFailed' }));
    setPending(false);
    setApproved(true);
  };

  const callContribute = async () => {
    setPending(true);
    const result = await contributeDeal(
      deal.address,
      contributionValue.replace(',', '').toString()
    );
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
          value={contributionValue.replace(',', '')}
          min={deal.minContribution}
          max={deal.personalCap || 0}
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
          />
        </span>
        <span>USDT</span>
      </div>
      <div className="deal__field deal__field-modal-action vertical-center">
        <RoundedButton disabled={isPending} onClick={onCloseDealModal}>
          Cancel
        </RoundedButton>
        <RoundedButton type="primary" disabled={isPending} onClick={onApprove}>
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
