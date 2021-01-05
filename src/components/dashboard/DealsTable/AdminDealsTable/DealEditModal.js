import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import RoundedButton from 'components/common/button/rounded-button';
import CustomInput from 'components/common/input/custom-input';
import './index.scss';

function DealEditModal({ data, onClose, onCreate, onUpdate }) {
  const [deal, setDeal] = useState(data);

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setDeal({ ...deal, [name]: value });
  };

  return (
    <div className="deal-edit-modal">
      <div className="deal-edit-modal__header d-flex">
        <div className="deal-edit-modal__header-left d-flex">
          <div className="vertical-end">
            <RoundedAvatar />
          </div>
          <div className="deal-image">
            <CustomInput
              label="Deal Image"
              name="imageUrl"
              value={deal.imageUrl}
              onChange={onChangeInput}
            />
          </div>
          <div className="deal-name">
            <CustomInput label="Deal Name" name="name" value={deal.name} onChange={onChangeInput} />
          </div>
        </div>
        <div className="deal-edit-modal__header-right vertical-center">
          <div>
            <RoundedButton onClick={onClose}>Cancel</RoundedButton>
            {deal.address ? (
              <RoundedButton type="primary" onClick={() => onUpdate(deal)}>
                Update
              </RoundedButton>
            ) : (
              <RoundedButton type="primary" onClick={() => onCreate(deal)}>
                Create
              </RoundedButton>
            )}
          </div>
        </div>
      </div>
      <div className="deal-edit-modal__content">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <div className="deal-size">
              <CustomInput
                label="Deal Size"
                name="dealSize"
                value={deal.dealSize}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-view-level">
              <CustomInput
                label="Min View Level"
                name="minViewLevel"
                value={deal.minViewLevel.toString()}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-access-level">
              <CustomInput
                label="Min Access Level"
                name="minAccessLevel"
                value={deal.minAccessLevel.toString()}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-start-time">
              <CustomInput
                label="Unlimited Start Time"
                name="unlimitedTimestamp"
                value={moment(deal.unlimitedTimestamp).format('MM / DD / YYYY')}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <div className="deal-contribution-token">
              <CustomInput label="Contribution Token" value="USDT" disabled />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-contribution">
              <CustomInput
                label="Min Contribution"
                name="minContribution"
                value={deal.minContribution}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-allocation-modal">
              <CustomInput
                label="Allocation Model"
                name="allocationModel"
                value={deal.allocationModel}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-personal-cap">
              <CustomInput
                label="Personal Cap"
                name="userCap"
                value={deal.userCap}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

DealEditModal.propTypes = {
  data: PropTypes.shape(),
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
};

DealEditModal.defaultProps = {
  data: {},
  onClose: () => {},
  onCreate: () => {},
  onUpdate: () => {},
};

export default DealEditModal;
