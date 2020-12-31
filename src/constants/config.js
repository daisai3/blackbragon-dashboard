const APP_CONFIG = {};

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  APP_CONFIG.API_BASE_URL = 'http://localhost:5000';
} else {
  APP_CONFIG.API_BASE_URL = 'http://localhost:5000';
}

export default APP_CONFIG;
