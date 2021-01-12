import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import ClaimDealModal from 'components/dashboard/Modal/ClaimDealModal';
import { updateGlobal } from 'store/actions';
import { claimDeal } from 'contracts/index';
import './index.scss';

const DealRow = ({ deal, onFetchDeals }) => {
  const dispatch = useDispatch();
  const [claimModalOpened, setClaimModalOpened] = useState(false);
  const [isPending, setPending] = useState(false);
  const authReducer = useSelector((state) => state.auth);
  const { accountInfo, walletAddress } = authReducer;

  const onToggleClaimModal = () => {
    setClaimModalOpened(!claimModalOpened);
  };

  const onContribute = () => {
    dispatch(updateGlobal({ activeDeal: deal }));
  };

  const onClaim = async () => {
    setPending(true);
    const result = await claimDeal(deal.address, walletAddress);
    if (result) onFetchDeals();
    setPending(false);
  };

  return (
    <>
      <ClaimDealModal
        open={claimModalOpened}
        isPending={isPending}
        deal={deal}
        onOk={onClaim}
        onClose={onToggleClaimModal}
      />
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
              disabled={
                Number(accountInfo.usdtBalance) < Number(deal.minContribution) ||
                Number(accountInfo.userAccessLevel) < deal.minAccessLevel
              }
              onClick={onContribute}
            >
              Contribute
            </RoundedButton>
          ) : (
            <RoundedButton
              disabled={!deal.claimAmounts || deal.claimAmounts.length === 0}
              onClick={onToggleClaimModal}
            >
              Claim
            </RoundedButton>
          )}
        </div>
      </div>
    </>
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
