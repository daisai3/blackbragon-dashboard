import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import CustomInput from 'components/common/input/custom-input';
import { updateGlobal } from 'store/actions';
import { isNumeric } from 'utils/index';
import tempDeals from './constants';
import './index.scss';

const DEAL_STATUS = {
  live: 'Live',
  cancelled: 'Canceled',
  paused: 'Paused',
  closed: 'Closed',
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 0 10px 0`,
  background: '#0f0f0f',
  borderColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  width: '100%',
  padding: 0,
});

function DealsTable() {
  const dispatch = useDispatch();
  const [deals, setDeals] = useState(tempDeals);
  const [activeDealContributionValue, setActiveDealContributionValue] = useState('');
  const globalReducer = useSelector((state) => state.global);
  const { activeDeal } = globalReducer;

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const _deals = reorder(deals, result.source.index, result.destination.index);
    setDeals(_deals);
  };

  const onContribute = (deal) => {
    setActiveDealContributionValue(deal.contribution);
    dispatch(updateGlobal({ activeDeal: deal }));
  };

  const onApprove = (deal) => {};

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
    setActiveDealContributionValue('');
  };

  const onChangeContributionValue = (e) => {
    const { value } = e.target;
    if (!isNumeric(value)) return;
    setActiveDealContributionValue(value);
  };

  return (
    <div className="deals-table">
      <div className="deals-table-header d-flex full-width">
        <div className="deal__field deal__field-avatar vertical-center" />
        <div className="deal__field deal__field-name vertical-center">Name</div>
        <div className="deal__field deal__field-status vertical-center">Status</div>
        <div className="deal__field deal__field-size vertical-center">Deal size</div>
        <div className="deal__field deal__field-raised-amount vertical-center">Raised Amount</div>
        <div className="deal__field deal__field-model vertical-center">Deal Model</div>
        <div className="deal__field deal__field-minimum vertical-center">Minimum</div>
        <div className="deal__field deal__field-maximum  vertical-center">Maximum</div>
        <div className="deal__field deal__field-contribution vertical-center">
          <span>Contribution</span>
          <span>
            <SvgIcon name="help" />
          </span>
        </div>
        <div className="deal__field deal__field-action vertical-center" />
      </div>
      <div className="deals-table-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  ...getListStyle(snapshot.isDraggingOver),
                  background: 'transparent !important',
                  overflowX: 'auto',
                }}
              >
                {deals.map((deal, index) => (
                  <Draggable key={deal.id} draggableId={deal.id} index={index}>
                    {(provided1, snapshot1) => (
                      <div
                        ref={provided1.innerRef}
                        {...provided1.draggableProps}
                        {...provided1.dragHandleProps}
                        style={{
                          ...getItemStyle(snapshot1.isDragging, provided1.draggableProps.style),
                        }}
                        className={`deals-table-content__row ${
                          activeDeal && activeDeal.id === deal.id
                            ? 'deals-table-content__row--active'
                            : ''
                        }`}
                      >
                        {activeDeal && activeDeal.id === deal.id ? (
                          // edit modal
                          <div className="d-flex full-width">
                            <div className="deal__field deal__field-avatar vertical-center">
                              <RoundedAvatar />
                            </div>
                            <div className="deal__field deal__field-name vertical-center">
                              <div>
                                <div>{deal.name}</div>
                                <CustomProgressBar percent={65} />
                              </div>
                            </div>
                            <div
                              className={`deal__field deal__field-status deal__field-status--${deal.status} vertical-center`}
                            >
                              <span className="deal__field-status__icon">
                                <SvgIcon name="dot" />
                              </span>
                              <span>{DEAL_STATUS[deal.status]}</span>
                            </div>
                            <div className="deal__field deal__field-modal-bar vertical-center">
                              <CustomProgressBar percent={65} />
                            </div>
                            <div className="deal__field deal__field-modal-contribution vertical-center">
                              <span>
                                <CustomInput
                                  placeholder=""
                                  value={activeDealContributionValue}
                                  onChange={onChangeContributionValue}
                                />
                              </span>
                              <span>USDT</span>
                            </div>
                            <div className="deal__field deal__field-modal-action vertical-center">
                              <RoundedButton onClick={onCloseDealModal}>Cancel</RoundedButton>
                              <RoundedButton type="primary" onClick={() => onApprove(deal)}>
                                Approve
                              </RoundedButton>
                            </div>
                          </div>
                        ) : (
                          // only view
                          <div className="d-flex full-width">
                            <div className="deal__field deal__field-avatar vertical-center">
                              <RoundedAvatar />
                            </div>
                            <div className="deal__field deal__field-name vertical-center">
                              <div>
                                <div>{deal.name}</div>
                                <CustomProgressBar percent={65} />
                              </div>
                            </div>
                            <div
                              className={`deal__field deal__field-status deal__field-status--${deal.status} vertical-center`}
                            >
                              <span className="deal__field-status__icon">
                                <SvgIcon name="dot" />
                              </span>
                              <span>{DEAL_STATUS[deal.status]}</span>
                            </div>
                            <div className="deal__field deal__field-size vertical-center">{`$${deal.size}`}</div>
                            <div className="deal__field deal__field-raised-amount vertical-center">
                              {`$${deal.raisedAmount}`}
                            </div>
                            <div className="deal__field deal__field-model vertical-center">
                              {deal.model}
                            </div>
                            <div className="deal__field deal__field-minimum vertical-center">{`$${deal.minimum}`}</div>
                            <div className="deal__field deal__field-maximum  vertical-center">{`$${deal.maximum}`}</div>
                            <div className="deal__field deal__field-contribution vertical-center">
                              <span>{`$${deal.contribution}`}</span>
                            </div>
                            <div className="deal__field deal__field-action vertical-center">
                              {DEAL_STATUS[deal.status] === 'Live' ? (
                                <RoundedButton type="primary" onClick={() => onContribute(deal)}>
                                  Contribute
                                </RoundedButton>
                              ) : (
                                <RoundedButton disabled>Claim</RoundedButton>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

DealsTable.propTypes = {};

DealsTable.defaultProps = {};

export default withRouter(DealsTable);
