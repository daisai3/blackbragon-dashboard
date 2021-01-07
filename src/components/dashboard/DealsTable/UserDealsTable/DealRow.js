import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import NumberFormat from 'react-number-format';
import { updateGlobal } from 'store/actions';
import './index.scss';

const DealRow = ({ deal }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);
  const { accountInfo } = authReducer;

  const onContribute = () => {
    dispatch(updateGlobal({ activeDeal: deal }));
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
        <span className="deal__field-status__name">
          {deal.status === 'opened' ? 'live' : deal.status}
        </span>
      </div>
      <div className="deal__field deal__field-size vertical-center">
        <NumberFormat
          value={Number(deal.dealSize)}
          thousandSeparator
          displayType="text"
          prefix="$"
        />
      </div>
      <div className="deal__field deal__field-raised-amount vertical-center">
        <NumberFormat
          value={Number(deal.raisedAmount)}
          thousandSeparator
          displayType="text"
          prefix="$"
        />
      </div>
      <div className="deal__field deal__field-model vertical-center">{deal.allocationModel}</div>
      <div className="deal__field deal__field-maximum  vertical-center">
        <NumberFormat
          value={Number(deal.personalCap || 0)}
          thousandSeparator
          displayType="text"
          prefix="$"
        />
      </div>
      <div className="deal__field deal__field-contribution vertical-center">
        <span>
          <NumberFormat
            value={Number(deal.contributedAmount)}
            thousandSeparator
            displayType="text"
            prefix="$"
          />
        </span>
      </div>
      <div className="deal__field deal__field-action vertical-center">
        {deal.status === 'opened' ? (
          <RoundedButton
            type="primary"
            disabled={Number(accountInfo.bdtBalance) < Number(deal.minContributorBDTBalance)}
            onClick={onContribute}
          >
            Contribute
          </RoundedButton>
        ) : (
          <RoundedButton disabled>Claim</RoundedButton>
        )}
      </div>
    </div>
  );
};

DealRow.propTypes = {
  deal: PropTypes.shape(),
};

DealRow.defaultProps = {
  deal: {},
};

export default React.memo(DealRow);
