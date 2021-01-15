import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import RoundedButton from 'components/common/button/rounded-button';
import CustomInput from 'components/common/input/custom-input';
import NumberInput from 'components/common/input/number-input';
import CustomSelect from 'components/common/select/custom-select';
import SvgIcon from 'components/common/svgIcon';
import CircleLoading from 'components/common/loading/circle-loading';
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

const statusItems = [
  {
    id: 0,
    name: (
      <div className="deal__field-status--opened vertical-center">
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">Live</span>
      </div>
    ),
    value: 'opened',
  },
  {
    id: 1,
    name: (
      <div className="deal__field-status--paused vertical-center full-width">
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">Paused</span>
      </div>
    ),
    value: 'paused',
  },
  {
    id: 2,
    name: (
      <div className="deal__field-status--closed vertical-center">
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">Closed</span>
      </div>
    ),
    value: 'closed',
  },
  {
    id: 3,
    name: (
      <div className="deal__field-status--canceled vertical-center">
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">Canceled</span>
      </div>
    ),
    value: 'canceled',
  },
  {
    id: 4,
    name: (
      <div className="deal__field-status--distributed vertical-center">
        <span className="deal__field-status__icon">
          <SvgIcon name="dot" />
        </span>
        <span className="deal__field-status__name">Distributed</span>
      </div>
    ),
    value: 'distributed',
  },
];

const unlimitedTimeItems = [
  { id: 0, name: 'now', value: 0 },
  { id: 1, name: '4h', value: 4 * 3600 },
  { id: 2, name: '6h', value: 6 * 3600 },
  { id: 3, name: '8h', value: 8 * 3600 },
  { id: 4, name: '12h', value: 12 * 3600 },
  { id: 5, name: '24h', value: 24 * 4600 },
];

function DealEditModal({ data, isPending, onClose, onCreate, onUpdate }) {
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
        <Grid container spacing={4}>
          <Grid item xs={3}>
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
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-name">
              <CustomInput
                label="Deal Name"
                name="name"
                value={deal.name}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-status">
              <CustomSelect
                label="Status"
                name="status"
                value={deal.status}
                items={statusItems}
                onSelect={onChangeSelect}
              />
            </div>
          </Grid>
          <Grid item xs={3} className="vertical-end">
            <div className="deal-action vertical-center">
              <div className="d-flex">
                <RoundedButton disabled={isPending} onClick={onClose}>
                  Cancel
                </RoundedButton>
                <RoundedButton
                  type="primary"
                  disabled={isPending}
                  onClick={() => {
                    if (deal.address) onUpdate(deal);
                    else onCreate(deal);
                  }}
                >
                  <div className="d-flex">
                    {deal.address ? 'Update' : 'Create'}
                    <CircleLoading loading={isPending} />
                  </div>
                </RoundedButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="deal-edit-modal__content">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <div className="deal-field deal-size">
              <NumberInput
                label="Deal Size"
                name="dealSize"
                value={deal.dealSize}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-field deal-min-view-level">
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
            <div className="deal-field deal-min-access-level">
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
            <div className="deal-field deal-start-time">
              <CustomSelect
                label="Unlimited Start Time"
                name="unlimitedTimestamp"
                value={deal.unlimitedTimestamp || 0}
                items={unlimitedTimeItems}
                onSelect={onChangeSelect}
              />
              {/* <CustomInput
                label="Unlimited Start Time"
                name="unlimitedTimestamp"
                value={moment(deal.unlimitedTimestamp).format('MM / DD / YYYY')}
                onChange={onChangeInput}
              /> */}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <div className="deal-field deal-contribution-token">
              <CustomInput label="Contribution Token" value="USDT" disabled />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-field deal-min-contribution">
              <NumberInput
                label="Min Contribution"
                name="minContribution"
                value={deal.minContribution}
                onChange={onChangeInput}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="deal-field deal-allocation-modal">
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
            <div className="deal-field deal-personal-cap">
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
  isPending: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
};

DealEditModal.defaultProps = {
  data: {},
  isPending: true,
  onClose: () => {},
  onCreate: () => {},
  onUpdate: () => {},
};

export default DealEditModal;
