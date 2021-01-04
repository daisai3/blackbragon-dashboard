import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import IconButton from 'components/common/button/icon-button';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import { updateGlobal } from 'store/actions';
import DealEditModal from './DealEditModal';
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

function AdminDealsTable() {
  const dispatch = useDispatch();
  const [deals, setDeals] = useState(tempDeals);
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

  const onManage = (deal) => {
    // TODO: should show modal
    dispatch(updateGlobal({ activeDeal: deal }));
  };

  const onClickAddDeal = () => {
    dispatch(updateGlobal({ activeDeal: {} }));
  };

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
  };

  return (
    <div className="deals-table admin-deals-table">
      <div className="deals-table-header d-flex full-width">
        <div className="deal__field deal__field-avatar vertical-center" />
        <div className="deal__field deal__field-name vertical-center">Name</div>
        <div className="deal__field deal__field-status vertical-center">Status</div>
        <div className="deal__field deal__field-size vertical-center">Deal size</div>
        <div className="deal__field deal__field-raised-amount vertical-center">Raised Amount</div>
        <div className="deal__field deal__field-model vertical-center">Deal Model</div>
        <div className="deal__field deal__field-minimum vertical-center">Minimum</div>
        <div className="deal__field deal__field-status-stepper vertical-center" />
        <div className="deal__field deal__field-action vertical-center">
          Control Instructions...
        </div>
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
                {activeDeal && (
                  <div className="deal-edit-modal-wrapper">
                    <DealEditModal data={activeDeal} onClose={onCloseDealModal} />
                  </div>
                )}
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
                        className="deals-table-content__row"
                      >
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
                          <div className="deal__field deal__field-status-stepper vertical-center">
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'live'
                                  ? 'deal__field-status-step--live--active'
                                  : ''
                              }`}
                            >
                              <SvgIcon name="statusLive" />
                            </span>
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'paused'
                                  ? 'deal__field-status-step--paused--active'
                                  : ''
                              }`}
                            >
                              <SvgIcon name="statusPaused" />
                            </span>
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'closed'
                                  ? 'deal__field-status-step--closed--active'
                                  : ''
                              }`}
                            >
                              <SvgIcon name="statusClosed" />
                            </span>
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'cancelled'
                                  ? 'deal__field-status-step--cancelled--active'
                                  : ''
                              }`}
                            >
                              <SvgIcon name="statusCancelled" />
                            </span>
                          </div>
                          <div className="deal__field deal__field-action vertical-center">
                            <RoundedButton type="primary" onClick={() => onManage(deal)}>
                              Manage
                            </RoundedButton>
                          </div>
                        </div>
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
      <div className="deals-table-footer">
        <IconButton icon="plus" onClick={onClickAddDeal} />
      </div>
    </div>
  );
}

AdminDealsTable.propTypes = {};

AdminDealsTable.defaultProps = {};

export default AdminDealsTable;
