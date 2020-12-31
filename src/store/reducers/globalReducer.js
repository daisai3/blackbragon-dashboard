import * as actionTypes from '../constants';

const initialState = {
  loading: false,
  notificationDropdownOpened: false,
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_INIT_GLOBAL:
      return { ...initialState };
    case actionTypes.ACTION_UPDATE_GLOBAL:
      return { ...state, ...action.payload };
    case actionTypes.ACTION_INIT_LOADING:
      return { ...initialState, loading: false };
    case actionTypes.ACTION_UPDATE_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default globalReducer;
