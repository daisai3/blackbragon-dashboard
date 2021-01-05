import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgIcon from 'components/common/svgIcon';
import { updateGlobal } from 'store/actions';
import './index.scss';

const title = {
  approved: 'Deal, successfully approved!',
  failed: 'Oops, Deal was not approved!',
};
const description = {
  approved: 'You are going well :)',
  failed: 'Something goes wrong, try again!',
};

function DealApproveNotification() {
  const dispatch = useDispatch();
  const globalReducer = useSelector((state) => state.global);
  const { dealApprovedStatus } = globalReducer;

  const onClose = () => {
    dispatch(updateGlobal({ dealApprovedStatus: 'default' }));
  };

  if (dealApprovedStatus === 'default') return null;
  return (
    <div className={`deal-approve-notification deal-approve-notification--${dealApprovedStatus}`}>
      <div className="deal-approve-notification-icon vertical-center">
        <SvgIcon name="notification" />
      </div>
      <div className="deal-approve-notification-content">
        <div className="deal-approve-notification-content__title">{title[dealApprovedStatus]}</div>
        <div className="deal-approve-notification-content__description">
          {description[dealApprovedStatus]}
        </div>
      </div>
      <div
        className="deal-approve-notification-action vertical-center"
        role="presentation"
        onClick={onClose}
      >
        Close
      </div>
    </div>
  );
}

DealApproveNotification.propTypes = {};

DealApproveNotification.defaultProps = {};

export default DealApproveNotification;
