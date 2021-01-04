import * as actionTypes from '../constants';

const initialState = {
  accountInfo: {},
  walletAddress: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_INIT_AUTH:
      return initialState;
    case actionTypes.ACTION_UPDATE_AUTH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;
