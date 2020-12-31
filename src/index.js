import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'containers/app';
import { store, persistor } from 'store';
import 'typeface-barlow';
import 'sass/global.scss';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

render(<Root />, document.getElementById('root'));
