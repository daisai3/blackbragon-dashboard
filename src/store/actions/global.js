import * as actionTypes from '../constants';

export const initGlobal = (payload) => ({
  type: actionTypes.ACTION_INIT_GLOBAL,
  payload,
});

export const updateGlobal = (payload) => ({
  type: actionTypes.ACTION_UPDATE_GLOBAL,
  payload,
});

export const initLoading = (payload) => ({
  type: actionTypes.ACTION_INIT_LOADING,
  payload,
});

export const updateLoading = (payload) => ({
  type: actionTypes.ACTION_UPDATE_LOADING,
  payload,
});
