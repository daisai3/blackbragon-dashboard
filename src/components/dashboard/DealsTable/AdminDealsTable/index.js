import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RoundedAvatar from 'components/common/avatar/rounded-avatar';
import SvgIcon from 'components/common/svgIcon';
import IconButton from 'components/common/button/icon-button';
import RoundedButton from 'components/common/button/rounded-button';
import CustomProgressBar from 'components/common/progress-bar/custom-progress-bar';
import { updateGlobal } from 'store/actions';
import {
  createDeal,
  updateDeal,
  cancelDeal,
  closeDeal,
  pauseDeal,
  unpauseDeal,
} from 'contracts/index';
import DealEditModal from './DealEditModal';
import './index.scss';

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

function AdminDealsTable({ userDeals, onFetchDeals }) {
  const dispatch = useDispatch();
  const [deals, setDeals] = useState([]);
  const globalReducer = useSelector((state) => state.global);
  const { activeDeal } = globalReducer;

  useEffect(() => {
    setDeals(userDeals);
  }, [userDeals]);

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
    dispatch(
      updateGlobal({
        activeDeal: {
          name: '',
          dealSize: '100000.0',
          minContribution: '250.0',
          allocationModel: 'ProRata',
          minViewLevel: 0,
          userCap: '0.0',
          minAccessLevel: 0,
          imageUrl: '',
          unlimitedTimestamp: 0,
        },
      })
    );
  };

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
  };

  const onCreateDeal = async (deal) => {
    const result = await createDeal(deal);
    onCloseDealModal();
    if (result) onFetchDeals();
  };

  const onUpdateDeal = async (deal) => {
    const result = await updateDeal(deal);
    onCloseDealModal();
    if (result) onFetchDeals();
  };

  const onUnpauseDeal = async (deal) => {
    if (deal.status === 'opened') return;
    const result = await unpauseDeal(deal.address);
    if (result) onFetchDeals();
  };

  const onPauseDeal = async (deal) => {
    if (deal.status === 'paused') return;
    const result = await pauseDeal(deal.address);
    if (result) onFetchDeals();
  };

  const onCloseDeal = async (deal) => {
    if (deal.status === 'closed') return;
    const result = await closeDeal(deal.dealAddress);
    if (result) onFetchDeals();
  };

  const onCancelDeal = async (deal) => {
    if (deal.status === 'canceled') return;
    const result = await cancelDeal(deal.address);
    if (result) onFetchDeals();
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
                    <DealEditModal
                      data={activeDeal}
                      onClose={onCloseDealModal}
                      onCreate={onCreateDeal}
                      onUpdate={onUpdateDeal}
                    />
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
                              <CustomProgressBar
                                percent={(Number(deal.raisedAmount) * 100) / Number(deal.dealSize)}
                              />
                            </div>
                          </div>
                          <div
                            className={`deal__field deal__field-status deal__field-status--${deal.status} vertical-center`}
                          >
                            <span className="deal__field-status__icon">
                              <SvgIcon name="dot" />
                            </span>
                            <span>{deal.status}</span>
                          </div>
                          <div className="deal__field deal__field-size vertical-center">{`$${deal.dealSize}`}</div>
                          <div className="deal__field deal__field-raised-amount vertical-center">
                            {`$${deal.raisedAmount}`}
                          </div>
                          <div className="deal__field deal__field-model vertical-center">
                            {deal.allocationModel}
                          </div>
                          <div className="deal__field deal__field-minimum vertical-center">{`$${deal.minContribution}`}</div>
                          <div className="deal__field deal__field-status-stepper vertical-center">
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'opened'
                                  ? 'deal__field-status-step--opened--active'
                                  : ''
                              }`}
                            >
                              <IconButton icon="statusOpened" onClick={() => onUnpauseDeal(deal)} />
                            </span>
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'paused'
                                  ? 'deal__field-status-step--paused--active'
                                  : ''
                              }`}
                            >
                              <IconButton icon="statusPaused" onClick={() => onPauseDeal(deal)} />
                            </span>
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'closed'
                                  ? 'deal__field-status-step--closed--active'
                                  : ''
                              }`}
                            >
                              <IconButton icon="statusClosed" onClick={() => onCloseDeal(deal)} />
                            </span>
                            <span
                              className={`deal__field-status-step ${
                                deal.status === 'canceled'
                                  ? 'deal__field-status-step--canceled--active'
                                  : ''
                              }`}
                            >
                              <IconButton
                                icon="statusCanceled"
                                onClick={() => onCancelDeal(deal)}
                              />
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

AdminDealsTable.propTypes = {
  userDeals: PropTypes.arrayOf(PropTypes.shape()),
  onFetchDeals: PropTypes.func,
};

AdminDealsTable.defaultProps = {
  userDeals: [],
  onFetchDeals: () => {},
};

export default AdminDealsTable;
