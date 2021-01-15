import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import IconButton from 'components/common/button/icon-button';
import RoundedButton from 'components/common/button/rounded-button';
import { updateGlobal } from 'store/actions';
import { createDeal, updateDeal } from 'contracts/index';
import DealEditModal from './DealEditModal';
import DealRow from './DealRow';
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
  const [isPending, setPending] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const globalReducer = useSelector((state) => state.global);
  const { activeDeal } = globalReducer;

  const getFilteredDeals = () => {
    if (filterOption === 'all') {
      return userDeals;
    }
    if (filterOption === 'active') {
      return userDeals.filter((deal) => deal.status === 'opened' || deal.status === 'paused');
    }
    if (filterOption === 'closed') {
      return userDeals.filter((deal) => deal.status === 'closed');
    }
    if (filterOption === 'canceled') {
      return userDeals.filter((deal) => deal.status === 'canceled');
    }
    if (filterOption === 'distributed') {
      return userDeals.filter((deal) => deal.status === 'distributed');
    }

    return userDeals;
  };

  useEffect(() => {
    setDeals(getFilteredDeals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDeals, filterOption]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const _deals = reorder(deals, result.source.index, result.destination.index);
    setDeals(_deals);
  };

  const onClickAddDeal = () => {
    dispatch(
      updateGlobal({
        activeDeal: {
          name: '',
          dealSize: '100000',
          minContribution: '250',
          allocationModel: 'ProRata',
          minViewLevel: 0,
          userCap: '0',
          minAccessLevel: 0,
          imageUrl: '',
          unlimitedTimestamp: 0,
          status: 'opened',
        },
      })
    );
  };

  const onCloseDealModal = () => {
    dispatch(updateGlobal({ activeDeal: null }));
  };

  const onCreateDeal = async (deal) => {
    setPending(true);
    const result = await createDeal(deal);
    setPending(false);
    onCloseDealModal();
    if (result) onFetchDeals();
  };

  const onUpdateDeal = async (deal) => {
    setPending(true);
    const result = await updateDeal(deal);
    setPending(false);
    onCloseDealModal();
    if (result) onFetchDeals();
  };

  const onSelectFilter = (val) => {
    if (val !== filterOption) setFilterOption(val);
  };

  return (
    <div className="deals-table admin-deals-table">
      <div className="deals-table-options d-flex">
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('all')}
          >
            <span>All Deals</span>
          </RoundedButton>
        </div>
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'active' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('active')}
          >
            <span>Live</span>
          </RoundedButton>
        </div>
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'closed' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('closed')}
          >
            <span>Closed</span>
          </RoundedButton>
        </div>
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'canceled' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('canceled')}
          >
            <span>Canceled</span>
          </RoundedButton>
        </div>
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'distributed' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('distributed')}
          >
            <span>Fully Distributed</span>
          </RoundedButton>
        </div>
      </div>
      <div className="deals-table-header d-flex full-width">
        <div className="deal__field deal__field-avatar vertical-center" />
        <div className="deal__field deal__field-name vertical-center">Name</div>
        <div className="deal__field deal__field-status vertical-center">Status</div>
        <div className="deal__field deal__field-raised-amount vertical-center">Raised Amount</div>
        <div className="deal__field deal__field-size vertical-center">Deal size</div>
        <div className="deal__field deal__field-model vertical-center">Deal Model</div>
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
                      isPending={isPending}
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
                        <DealRow deal={deal} onFetchDeals={onFetchDeals} />
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
