const APP_CONFIG = {};

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  APP_CONFIG.API_BASE_URL = 'http://localhost:5000';
} else {
  APP_CONFIG.API_BASE_URL = 'http://localhost:5000';
}
export { APP_CONFIG };
export const ADMIN_ADDRESS = '0xBc05ad6390eFA623322D0B8f2C86bC8F2D73f010';
