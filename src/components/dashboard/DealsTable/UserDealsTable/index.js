import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SvgIcon from 'components/common/svgIcon';
import RoundedButton from 'components/common/button/rounded-button';
import DealEditRow from './DealEditRow';
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

function UserDealsTable({ userDeals, onFetchDeals }) {
  const [deals, setDeals] = useState([]);
  const [filterOption, setFilterOption] = useState('all deals');
  const globalReducer = useSelector((state) => state.global);
  const { activeDeal } = globalReducer;

  const getFilteredDeals = () => {
    if (filterOption === 'all deals') {
      return userDeals.sort((a, b) => (a.status === 'opened' && b.status !== 'opened' ? -1 : 1));
    }
    return userDeals.filter((deal) => Number(deal.contributedAmount) > 0);
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

  const onSelectFilter = (val) => {
    if (val !== filterOption) setFilterOption(val);
  };

  return (
    <div className="deals-table">
      <div className="deals-table-options d-flex">
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'all deals' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('all deals')}
          >
            <span>All Deals</span>
          </RoundedButton>
        </div>
        <div className="filter-btn-wrapper">
          <RoundedButton
            className={`filter-btn ${filterOption === 'my deals' ? 'filter-btn--active' : ''}`}
            onClick={() => onSelectFilter('my deals')}
          >
            <span>My Deals</span>
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
                  <Draggable
                    key={deal.id}
                    draggableId={deal.id}
                    index={index}
                    isDragDisabled={!!activeDeal}
                  >
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
                          <DealEditRow deal={deal} onFetchDeals={onFetchDeals} />
                        ) : (
                          <DealRow deal={deal} onFetchDeals={onFetchDeals} />
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

UserDealsTable.propTypes = {
  userDeals: PropTypes.arrayOf(PropTypes.shape()),
  onFetchDeals: PropTypes.func,
};

UserDealsTable.defaultProps = {
  userDeals: [],
  onFetchDeals: () => {},
};

export default React.memo(UserDealsTable);
