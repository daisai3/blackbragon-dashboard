import Axios from 'axios';
import APP_CONFIG from '../constants/config';

const { API_BASE_URL } = APP_CONFIG;
const FULL_URL = `${API_BASE_URL}/v1/auth`;

const register = (body) => {
  return Axios.post(`${FULL_URL}/register`, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      const { response: errorResponse } = { ...err };
      return errorResponse;
    });
};

const login = (body) => {
  return Axios.post(`${FULL_URL}/login`, body)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      const { response: errorResponse } = { ...err };
      return errorResponse;
    });
};

export default {
  register,
  login,
};
