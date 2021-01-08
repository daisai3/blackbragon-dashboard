import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import RoundedButton from 'components/common/button/rounded-button';
import IconButton from 'components/common/button/icon-button';
import SvgIcon from 'components/common/svgIcon';
import disclaimRules from './constants';
import './index.scss';

const DisclaimModal = ({ open, onConfirm, onClose }) => {
  return (
    <Dialog open={open} className="disclaim-modal" id="disclaim-modal" onClose={onClose}>
      <div className="disclaim-modal-header d-flex">
        <div className="disclaim-modal-header__title d-flex vertical-center">
          <SvgIcon name="report" />
          <span>Disclaimer</span>
        </div>
        <div className="disclaim-modal-header__btn vertical-center">
          <IconButton icon="close" onClick={onClose} />
        </div>
      </div>
      <div className="disclaim-modal-body d-flex">
        <div className="disclaim-rules">
          {disclaimRules.map((rule) => (
            <p className="disclaim-rules__item" key={rule.id}>
              {rule.text}
            </p>
          ))}
        </div>
      </div>
      <div className="disclaim-modal-footer">
        <div className="disclaim-actions">
          <RoundedButton onClick={onClose}>Decline</RoundedButton>
          <RoundedButton type="secondary" onClick={onConfirm}>
            Confirm
          </RoundedButton>
        </div>
      </div>
    </Dialog>
  );
};

DisclaimModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

DisclaimModal.defaultProps = {
  open: false,
  onClose: () => {},
  onConfirm: () => {},
};

export default DisclaimModal;
