import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import CustomSlider from 'components/common/progress-bar/custom-slider';
import NumberInput from 'components/common/input/number-input';
import { updateGlobal } from 'store/actions';
import { approveDeal } from 'contracts/index';
import './index.scss';

const DealEditRow = ({ deal }) => {
  const dispatch = useDispatch();
  const [contributionValue, setContributionValue] = useState('');
  const authReducer = useSelector((state) => state.auth);
  const { walletAddress } = authReducer;

  useEffect(() => {
    setContributionValue(Number(deal.contributedAmount).toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeContributionValue = (e) => {
    const { value } = e.target;
    setContributionValue(value);
  };

  const onChangeContributionSlider = useCallback((event, val) => {
    setContributionValue(val);
  }, []);

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
    setContributionValue('');
  };

  const onApprove = async () => {
    onCloseDealModal();
    const result = await approveDeal(walletAddress, contributionValue.toString());
    dispatch(updateGlobal({ dealApprovedStatus: result ? 'approved' : 'failed' }));
  };

  return (
    <div className="d-flex full-width">
      <div className="deal__field deal__field-avatar vertical-center">
        <RoundedAvatar src={deal.imageUrl} />
      </div>
      <div className="deal__field deal__field-name vertical-center">
        <div>
          <span>{deal.name}</span>
          <CustomProgressBar percent={(Number(deal.raisedAmount) * 100) / Number(deal.dealSize)} />
        </div>
      </div>
      <div
        className={`deal__field deal__field-status deal__field-status--${deal.status} vertical-center`}
      >
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">{deal.status}</span>
      </div>
      <div className="deal__field deal__field-modal-bar vertical-center">
        <CustomSlider
          value={Number(contributionValue.replace(',', ''))}
          min={Number(deal.minContributorBDTBalance)}
          max={Number(deal.personalCap || 0)}
          onChange={onChangeContributionSlider}
        />
      </div>
      <div className="deal__field deal__field-modal-contribution vertical-center">
        <span>
          <NumberInput
            placeholder=""
            value={contributionValue}
            onChange={onChangeContributionValue}
          />
        </span>
        <span>USDT</span>
      </div>
      <div className="deal__field deal__field-modal-action vertical-center">
        <RoundedButton onClick={onCloseDealModal}>Cancel</RoundedButton>
        <RoundedButton type="primary" onClick={onApprove}>
          Approve
        </RoundedButton>
      </div>
    </div>
  );
};

DealEditRow.propTypes = {
  deal: PropTypes.shape(),
};

DealEditRow.defaultProps = {
  deal: {},
};

export default React.memo(DealEditRow);
