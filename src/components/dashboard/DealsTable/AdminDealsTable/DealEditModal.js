import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import RoundedButton from 'components/common/button/rounded-button';
import CustomInput from 'components/common/input/custom-input';
import NumberInput from 'components/common/input/number-input';
import CustomSelect from 'components/common/select/custom-select';
import './index.scss';

const allocationModelItems = [
  { id: 0, name: 'Capped', value: 'Capped' },
  { id: 1, name: 'Pro Rata', value: 'ProRata' },
];

const levelItems = [
  { id: 0, name: 'Level 0', value: '0' },
  { id: 1, name: 'Level 1', value: '1' },
  { id: 2, name: 'Level 2', value: '2' },
  { id: 3, name: 'Level 3', value: '3' },
];

function DealEditModal({ data, onClose, onCreate, onUpdate }) {
  const [deal, setDeal] = useState({});

  const getFormatDeal = () => {
    const _data = { ...data };
    _data.dealSize = Number(data.dealSize).toString();
    _data.minContribution = Number(data.minContribution).toString();
    _data.userCap = Number(data.userCap).toString();
    return _data;
  };

  useEffect(() => {
    setDeal(getFormatDeal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setDeal({ ...deal, [name]: value });
  };

  const onChangeSelect = (name, value) => {
    setDeal({ ...deal, [name]: value });
  };

  return (
    <div className="deal-edit-modal">
      <div className="deal-edit-modal__header d-flex">
        <div className="deal-edit-modal__header-left d-flex">
          <div className="vertical-end">
            <RoundedAvatar src={deal.imageUrl} />
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
        <div className="deal-edit-modal__header-right">
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
              <NumberInput
                label="Deal Size"
                name="dealSize"
                value={deal.dealSize}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-view-level">
              <CustomSelect
                label="Min View Level"
                name="minViewLevel"
                value={deal.minViewLevel?.toString()}
                items={levelItems}
                onSelect={onChangeSelect}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-min-access-level">
              <CustomSelect
                label="Min Access Level"
                name="minAccessLevel"
                value={deal.minAccessLevel?.toString()}
                items={levelItems}
                onSelect={onChangeSelect}
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
              <NumberInput
                label="Min Contribution"
                name="minContribution"
                value={deal.minContribution}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-allocation-modal">
              <CustomSelect
                label="Allocation Model"
                name="allocationModel"
                value={deal.allocationModel}
                items={allocationModelItems}
                onSelect={onChangeSelect}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-personal-cap">
              <NumberInput
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
