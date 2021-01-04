import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import RoundedButton from 'components/common/button/rounded-button';
import CustomInput from 'components/common/input/custom-input';
import { isNumeric } from 'utils/index';
import './index.scss';

function DealEditModal({ data, onClose, onCreate }) {
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
          <div className="deal-size">
            <CustomInput label="Deal Size" />
          </div>
          <div className="deal-name">
            <CustomInput label="Deal Name" name="name" value={deal.name} onChange={onChangeInput} />
          </div>
        </div>
        <div className="deal-edit-modal__header-right vertical-center">
          <div>
            <RoundedButton onClick={onClose}>Cancel</RoundedButton>
            <RoundedButton type="primary" onClick={() => onCreate()}>
              Create
            </RoundedButton>
          </div>
        </div>
      </div>
      <div className="deal-edit-modal__content">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <div className="deal-size">
              <CustomInput label="Deal Size" />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-view-level">
              <CustomInput label="Min View Level" />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-access-level">
              <CustomInput label="Min Access Level" />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-start-time">
              <CustomInput label="Unlimited Start Time" />
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
              <CustomInput label="Min Contribution" />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-allocation-modal">
              <CustomInput label="Allocation Model" />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-personal-cap">
              <CustomInput label="Personal Cap" />
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
};

DealEditModal.defaultProps = {
  data: {},
  onClose: () => {},
  onCreate: () => {},
};

export default DealEditModal;
