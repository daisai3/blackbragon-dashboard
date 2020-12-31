import * as actionTypes from '../constants';

export const initAuth = (payload) => ({
  type: actionTypes.ACTION_INIT_AUTH,
  payload,
});

export const updateAuth = (payload) => ({
  type: actionTypes.ACTION_UPDATE_AUTH,
  payload,
});
